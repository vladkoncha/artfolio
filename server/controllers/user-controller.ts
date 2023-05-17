import userService from '../services/user-service';
import {validationResult} from 'express-validator';
import {ApiError} from '../exceptions/api-error';
import {NextFunction, Request, Response} from "express";
import tokenService, {DecodedAccessToken} from "../services/token-service";

class UserController {
    async registration(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка при валидации', errors.array()));
            }
            const {email, password} = req.body;
            const userData = await userService.registration(email, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const {email, password} = req.body;
            const userData = await userService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            const {refreshToken} = req.cookies;
            const token = await userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token);
        } catch (e) {
            next(e);
        }
    }

    async activate(req: Request, res: Response, next: NextFunction) {
        try {
            const activationLink = req.params.link;
            await userService.activate(activationLink);
            return res.redirect(process.env.CLIENT_URL as string);
        } catch (e) {
            next(e);
        }
    }

    async refresh(req: Request, res: Response, next: NextFunction) {
        try {
            const {refreshToken} = req.cookies;
            const userData = await userService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async getUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await userService.getAllUsers();
            return res.json(users);
        } catch (e) {
            next(e);
        }
    }

    async updateProfileInfo(req: Request, res: Response, next: NextFunction) {
        try {
            const {id, name, username, bio, links} = req.body;

            const authorizationHeader = req.headers.authorization;
            if (!authorizationHeader) {
                return next(ApiError.UnauthorizedError());
            }
            const accessToken = authorizationHeader.split(' ')[1];

            if (accessToken) {
                const decodedAccessToken = tokenService.decodeAccessToken(accessToken as string) as DecodedAccessToken;
                const userIdFromToken = decodedAccessToken.id;
                if (userIdFromToken !== id) {
                    return next(ApiError.UnauthorizedError());
                }
            } else {
                return next(ApiError.UnauthorizedError());
            }

            const userData = await userService.updateProfileInfo(id, name, username, bio, links);
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }
}

export default new UserController();