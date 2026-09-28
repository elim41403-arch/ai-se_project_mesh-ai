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

const createChat = async (req: Request, res: Response): Promise<void> => {
    const { title } = req.body;

    if(!title) {
        res.status(400).json({
            success: false,
            data: null,
            error: { message: 'title is required' },
        });
        return;
    }
    const chat = await Chat.create({
        title,
        userId: req.user!.userId,
    });

    res.status(201).json({
        success: true,
        data: chat,
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

const deleteChat = async (req: Request, res: Response): Promise<void> => {
    const chat = await Chat.findOneAndDelete({
        _id: req.params.id,
        userId: req.user!.userId,
    });

    if (!chat) {
        res.status(404).json({
            success: false,
            data: null,
            error: { message: 'no chat found' },
        });
        return;
    }

    await Message.deleteMany({ chatId: chat._id });

    res.status(200).json({
        success: true,
        data: null,
        error: null,
    });
};

export { getChats, createChat, getChat, deleteChat };