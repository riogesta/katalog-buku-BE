import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { Request, Response, NextFunction } from "express";

const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof PrismaClientKnownRequestError) {
        return res.json({
            message: err.message,
        });
    }

    res.json({
        message: err.message,
    });
};

export default errorHandler;
