import type { Request, Response } from "express";
import Chat from "../models/chats.js";
import Message from "../models/message.js";

const getChats = async (req: Request, res: Response): Promise<void> => {
    const chats = await Chat.find({ userId: req.user!.userId });

    res.status(200).json({
        success: true,
        data: chats,
        error: null
    });
};

const createChat = (req: Request, res: Response): void => {
    const { title } = req.body;

    if(!title) {
        res.status(400).json({
            success: false,
            data: null,
            error: { message: 'title is required' },
        });
        return;
    }
    res.status(201).json({
        success: true,
        data: title,
        error: null,
    });
};

const getChat = async (req: Request, res: Response): Promise<void> => {
    const userId = req.user!.userId;
    const chat = await Chat.findOne({ _id: req.params.id, userId });

    if(!chat){
        res.status(404).json({
            success: false,
            data: null,
            error: { message: 'no chat found' },
        });
        return;
    }

    const messages = await Message.find({ chatId: chat._id });

    res.status(200).json({
        success: true,
        data: { chat, messages },
        error: null
    });
};

const deleteChat = (req: Request, res: Response): void => {
    res.status(204).json({
    });
};

export { getChats, createChat, getChat, deleteChat };