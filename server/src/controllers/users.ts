import type { Request, Response } from "express";
import user from "../models/user.js";

export const getCurrentUser = async (req: Request, res: Response): Promise<void> => {
    const userId = req.user?.userId;
    const currentUser = await user.findById(userId).select("-password");

    if (!currentUser) {
        res.status(404).json({
            success: false,
            data: null,
            error: { message: "user not found" },
        });
        return;
    }

    res.status(200).json({
        success: true,
        data: currentUser,
        error: null,
    });
};