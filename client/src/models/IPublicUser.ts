import {ILink} from "./IUser";

export interface IPublicUser {
    name: string;
    username: string;
    bio: string;
    links: ILink[];
}