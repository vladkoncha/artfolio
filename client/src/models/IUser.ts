interface ILink {
    name: string;
    url: string;
}

export interface IUser {
    email: string;
    isActivated: boolean;
    id: string;

    name: string;
    username: string;
    bio: string;
    links: ILink[];
}