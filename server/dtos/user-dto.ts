export default class UserDto {
    email;
    id;
    isActivated;

    name;
    username;
    bio;
    links;

    constructor(model: {
        email: string;
        _id: string;
        isActivated: boolean;
        name: string;
        username: string;
        bio: string;
        links: { name: string, url: string }[];
    }) {
        this.email = model.email;
        this.id = model._id;
        this.isActivated = model.isActivated;
        this.name = model.name;
        this.username = model.username;
        this.bio = model.bio;
        this.links = model.links;
    }
}