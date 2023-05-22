import {IUser} from "../models/IUser";
import {makeAutoObservable} from "mobx";
import AuthService from "../services/AuthService";
import axios from "axios";
import {AuthResponse} from "../models/response/AuthResponse";
import {API_URL} from "../http";
import UserService from "../services/UserService";

export default class Store {
    user = {} as IUser;
    isAuth = false;
    isLoading = true;

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool: boolean) {
        this.isAuth = bool;
    }

    setUser(user: IUser) {
        this.user = user;
    }

    setLoading(bool: boolean) {
        this.isLoading = bool;
    }

    async login(email: string, password: string) {
        const response = await AuthService.login(email, password);
        console.log(response);
        localStorage.setItem('token', response.data.accessToken);
        this.setAuth(true);
        this.setUser(response.data.user);
    }

    async registration(email: string, username: string, password: string) {
        const response = await AuthService.registration(email, username, password);
        console.log(response);
        localStorage.setItem('token', response.data.accessToken);
        this.setAuth(true);
        this.setUser(response.data.user);
    }

    async logout() {
        try {
            this.setLoading(true);
            await AuthService.logout();
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({} as IUser);
            this.setLoading(false);
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }

    async checkAuth() {
        this.setLoading(true);
        try {
            const response = await axios.get<AuthResponse>(
                `${API_URL}/refresh`,
                {withCredentials: true}
            );
            console.log(response);

            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e: any) {
            console.log("checkAuth " + e.response?.data?.message);
        } finally {
            this.setLoading(false);
        }
    }

    async updateProfileInfo(user: IUser) {
        const response = await UserService.updateProfileInfo(user);
        console.log(response);
        this.setUser(response.data.user);
    }
}