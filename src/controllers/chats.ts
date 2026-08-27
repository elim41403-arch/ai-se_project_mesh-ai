import type { Request, Response } from "express";

const getChats = (req: Request, res: Response): void => {
    res.status(200).json({
        success: true,
        data: {},
        error: null
    });
};

const postChat = (req: Request, res: Response): void => {
    res.status(201).json({
        success: true,
        data: {},
        error: null
    });
};

const getChatById = (req: Request, res: Response): void => {
    res.status(200).json({
        success: true,
        data: {},
        error: null
    });
};

const deleteChat = (req: Request, res: Response): void => {
    res.status(204).json({
    });
};

const postChatById = (req: Request, res: Response): void => {
    res.status(201).json({
        success: true,
        data: {},
        error: null
    });
};

export { getChats, postChat, getChatById, deleteChat, postChatById };