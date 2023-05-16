import $api from "../http";
import {AxiosResponse} from 'axios';
import {IUser} from "../models/IUser";
import {AuthResponse} from "../models/response/AuthResponse";

export default class UserService {
    static fetchUsers(): Promise<AxiosResponse<IUser[]>> {
        return $api.get<IUser[]>('/users');
    }

    static updateProfileInfo(user: IUser): Promise<AxiosResponse<AuthResponse>> {
        return $api.post('/updateProfileInfo', user);
    }


}