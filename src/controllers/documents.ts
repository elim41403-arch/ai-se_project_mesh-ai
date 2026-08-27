import type { Request, Response } from "express";

const postDocument = (req: Request, res: Response): void => {
    res.status(201).json({
        success: true,
        data: {},
        error: null
    });
};

const getDocuments = (req: Request, res: Response): void => {
    res.status(200).json({
        success: true,
        data: {},
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

export { postDocument, getDocuments, getDocumentById, deleteDocument };