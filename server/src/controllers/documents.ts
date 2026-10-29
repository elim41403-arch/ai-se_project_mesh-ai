import type { Request, Response } from "express";
import Document from "../models/document.js";
import { readFileSync } from 'node:fs';
import { unlink } from 'node:fs/promises';
import { resolve } from 'node:path';
import { PDFParse } from 'pdf-parse';
import Chunk from '../models/chunk.js';
import { chunkText } from '../utils/chunk.js';
import { createEmbedding } from "../utils/embeddings.js";
import { getCacheValue, setCacheValue, deleteCacheValue } from '../utils/cache.js';

const uploadDocument = async (req: Request, res: Response): Promise<void> => {
    if (!req.file) {
        res.status(400).json({
            success: false,
            data: null,
            error: {message: 'file is required'},
        });
        return;
    }

    const buffer = readFileSync(req.file.path);
    const parser = new PDFParse({ data: buffer });
    const { text } = await parser.getText();
    const chunks = chunkText(text);

    const title = req.body.title || req.file.originalname;
    const document = await Document.create({
        title,
        fileName: req.file.originalname,
        storagePath: resolve(req.file.path),
        userId: req.user!.userId,
    });
    await deleteCacheValue(`documents-list:${req.user!.userId}`);

    await Promise.all(
  chunks.map(async (text) => {
    const embedding = await createEmbedding(text);
    return Chunk.create({ documentId: document._id, text, embedding });
  })
);

    res.status(201).json({
        success: true,
        data: document,
        error: null
    });
};

const getDocuments = async (req: Request, res: Response): Promise<void> => {
    const cacheKey = `documents-list:${req.user!.userId}`;
    const cached = getCacheValue(cacheKey);

    if(cached) {
        res.status(200).json(cached);
        return;
    }

    const documents = await Document.find({ userId: req.user!.userId });
    
    const responseData = {
        success: true,
        data: documents,
        error: null,
    };
    setCacheValue(cacheKey, responseData, 30 * 1000);

    res.status(200).json(responseData);
    };

const getDocumentById = async (req: Request, res: Response): Promise<void> => {
    const document = await Document.findOne({
        _id: req.params.id,
        userId: req.user!.userId,
    });

    if (!document) {
        res.status(404).json({
            success: false,
            data: null,
            error: { message: 'document not found' },
        });
        return;
    }

    res.status(200).json({
        success: true,
        data: document,
        error: null
    });
};

const deleteDocument = async (req: Request, res: Response): Promise<void> => {
    const document = await Document.findOne({
        _id: req.params.id,
        userId: req.user!.userId,
    });

    if (!document) {
        res.status(404).json({
            success: false,
            data: null,
            error: { message: 'document not found' },
        });
        return;
    }

    if (document.storagePath) {
        try {
            await unlink(document.storagePath);
        } catch (error) {
            if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
                throw error;
            }
        }
    }

    await document.deleteOne();
    await Chunk.deleteMany({ documentId: document._id });
    await deleteCacheValue(`documents-list:${req.user!.userId}`);
    res.status(200).json({
        success: true,
        data: null,
        error: null,
    });
};

export { uploadDocument, getDocuments, getDocumentById, deleteDocument };