import jwt, {JwtPayload} from 'jsonwebtoken';
import tokenModel from '../models/token-model';

class TokenService {
    generateTokens(payload: object) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET as jwt.Secret, {expiresIn: '30m'});
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET as jwt.Secret, {expiresIn: '30d'});
        return {accessToken, refreshToken};
    }

    validateAccessToken(token: string) {
        try {
            return jwt.verify(token, process.env.JWT_ACCESS_SECRET as jwt.Secret);
        } catch (e) {
            return null;
        }
    }

    validateRefreshToken(token: string): JwtPayload | null {
        try {
            return jwt.verify(token, process.env.JWT_REFRESH_SECRET as jwt.Secret) as JwtPayload;
        } catch (e) {
            return null;
        }
    }

    async saveToken(userId: string, refreshToken: string) {
        const tokenData = await tokenModel.findOne({user: userId});
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }
        return await tokenModel.create({user: userId, refreshToken});
    }

    async removeToken(refreshToken: string) {
        return tokenModel.deleteOne({refreshToken});
    }

    async findToken(refreshToken: string) {
        return tokenModel.findOne({refreshToken});
    }

}

export default new TokenService();