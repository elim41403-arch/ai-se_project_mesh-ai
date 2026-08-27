import type { Request, Response } from "express";

const getChats = (req: Request, res: Response): void => {
    res.status(200).json({
        success: true,
        data: {},
        error: null
    });
};

const postChats = (req: Request, res: Response): void => {
    res.status(201).json({
        success: true,
        data: {},
        error: null
    });
};

const getChatsById = (req: Request, res: Response): void => {
    res.status(200).json({
        success: true,
        data: {},
        error: null
    });
};

const deleteChats = (req: Request, res: Response): void => {
    res.status(204).json({
    });
};

const postChatsById = (req: Request, res: Response): void => {
    res.status(201).json({
        success: true,
        data: {},
        error: null
    });
};

export { getChats, postChats, getChatsById, deleteChats, postChatsById };