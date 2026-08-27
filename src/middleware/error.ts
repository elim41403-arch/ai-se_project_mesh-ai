import type { Request, Response, NextFunction } from "express";

function errorHandler( 
    err: Error & { statusCode?: number },
    req: Request,
    res: Response
):void {
    console.error(err);
        
    const statusCode = err.statusCode ?? 500;
    const message =  statusCode === 500 ? "An error has ovvured on the server" : err.message;

    res.status(statusCode).json({
        sucsess: false,
        data: null,
        error: message,
    });
}

function notFoundHandler(
    req: Request,
    res: Response
):void {
    res.status(404).json({
        success: false,
        data: null,
        error: `Route ${req.method} ${req.path} not found`
    });
}

export { errorHandler, notFoundHandler };