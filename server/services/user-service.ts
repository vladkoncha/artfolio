import UserModel from '../models/user-model';
import bcrypt from 'bcrypt';
import {v4} from 'uuid';
import tokenService from './token-service';
import UserDto from "../dtos/user-dto";
import {ApiError} from '../exceptions/api-error';
import PublicUserDto from "../dtos/public-user-dto";

class UserService {
    async registration(email: string, username: string, password: string) {
        const candidateEmail = await UserModel.findOne({email});
        if (candidateEmail) {
            throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует`);
        }
        const candidateUsername = await UserModel.findOne({username});
        if (candidateUsername) {
            throw ApiError.BadRequest(`Пользователь с username ${username} уже существует`);
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const activationLink: string = v4();

        const user = await UserModel.create({email, username, password: hashPassword, activationLink});

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

    async getUserByUsername(username: string) {
        const user = await UserModel.findOne({username});
        if (!user) {
            throw ApiError.NotFound('User not found');
        }
        return new PublicUserDto(user);
    }

    async updateProfileInfo(
        id: string,
        name: string,
        username: string,
        bio: string,
        links: { name: string, url: string }[],
    ) {
        const userByUsername = await UserModel.findOne({username});
        if (userByUsername && userByUsername._id.toString() !== id) {
            throw ApiError.BadRequest('User with such username already exists');
        }

        await UserModel.updateOne({_id: id}, {$set: {name, username, bio, links}});

        const user = await UserModel.findOne({_id: id});
        const userDto = new UserDto(user);
        return {user: userDto};
    }
}

export default new UserService();