import {NextFunction, Request, Response} from "express";

const ApiError = require('../exceptions/api-error');
import tokenService from "../services/token-service";
import {JwtPayload} from "jsonwebtoken";

interface AuthenticatedRequest extends Request {
    user: JwtPayload;
}

export default function (req: Request, res: Response, next: NextFunction) {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return next(ApiError.UnauthorizedError());
        }
        const accessToken = authorizationHeader.split(' ')[1];
        if (!accessToken) {
            return next(ApiError.UnauthorizedError());
        }

        const userData = tokenService.validateAccessToken(accessToken);
        if (!userData) {
            return next(ApiError.UnauthorizedError());
        }

        (req as AuthenticatedRequest).user = userData as JwtPayload;
        next();
    } catch (e) {
        return next(ApiError.UnauthorizedError());
    }
}