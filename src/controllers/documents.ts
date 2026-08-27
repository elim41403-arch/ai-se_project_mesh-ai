import type { Request, Response } from "express";

const postDocuments = (req: Request, res: Response): void => {
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

const getDocumentsById = (req: Request, res: Response): void => {
    res.status(200).json({
        success: true,
        data: {},
        error: null
    });
};

const deleteDocuments = (req: Request, res: Response): void => {
    res.status(204).json({
    });
};

export { postDocuments, getDocuments, getDocumentsById, deleteDocuments };