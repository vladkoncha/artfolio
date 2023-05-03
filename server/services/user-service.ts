import UserModel from '../models/user-model';
import bcrypt from 'bcrypt';
import {v4} from 'uuid';
import mailService from './mail-service';
import tokenService from './token-service';
import UserDto from "../dtos/user-dto";
import {ApiError} from '../exceptions/api-error';

class UserService {
    async registration(email: string, password: string) {
        const candidate = await UserModel.findOne({email});
        if (candidate) {
            throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует`);
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const activationLink: string = v4();

        const user = await UserModel.create({email, password: hashPassword, activationLink});

        // await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);

        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto};
    }

    async activate(activationLink: string) {
        const user = await UserModel.findOne({activationLink});
        if (!user) {
            throw ApiError.BadRequest('Некорректная ссылка активации');
        }
        user.isActivated = true;
        await user.save();
    }

    async login(email: string, password: string) {
        const user = await UserModel.findOne({email});
        if (!user) {
            throw ApiError.BadRequest('Пользователь с таким email не найден');
        }
        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            throw ApiError.BadRequest('Неверный пароль');
        }
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto};
    }

    async logout(refreshToken: string) {
        return await tokenService.removeToken(refreshToken);
    }

    async refresh(refreshToken: string) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError();
        }
        const user = await UserModel.findById(userData.id);
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto};
    }

    async getAllUsers() {
        return UserModel.find();
    }
}

export default new UserService();