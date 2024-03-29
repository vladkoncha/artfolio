import {ApiError} from "../exceptions/api-error";
import {NextFunction, Request, Response} from "express";


export default function (err: ApiError,
                         req: Request,
                         res: Response,
                         next: NextFunction): Response {
    console.log(err);

    const status: number = err.status || 500;
    const message: string = err.message || 'Something went wrong';
    const errors: any[] = err.errors || [];
    return res.status(status).send({
        status,
        message,
        errors
    });
}