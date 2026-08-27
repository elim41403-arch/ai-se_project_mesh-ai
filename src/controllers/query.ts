import type { Request, Response } from "express";

const postQuery = (req: Request, res: Response): void => {
    res.status(200).json({
        success: true,
        data: {},
        error: null
    });
};

export { postQuery };