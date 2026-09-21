import type { Request, Response } from "express";
import Document from "../models/document.js";
import { readFileSync } from 'fs';
import { PDFParse } from 'pdf-parse';
import Chunk from '../models/chunk.js';
import { chunkText } from '../utils/chunk.js';
import { createEmbedding } from "../utils/embeddings.js";

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
        userId: req.user!.userId,
    });

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
    const documents = await Document.find({ userId: req.user!.userId });
    
        res.status(200).json({
            success: true,
            data: documents,
            error: null
        });
    };

const getDocumentById = (req: Request, res: Response): void => {
    res.status(200).json({
        success: true,
        data: {},
        error: null
    });
};

const deleteDocument = (req: Request, res: Response): void => {
    res.status(204).json({
    });
};

export { uploadDocument, getDocuments, getDocumentById, deleteDocument };