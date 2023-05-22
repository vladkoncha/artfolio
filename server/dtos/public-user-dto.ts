export default class PublicUserDto {
    name;
    username;
    bio;
    links;

    constructor(model: {
        name: string;
        username: string;
        bio: string;
        links: { name: string, url: string }[];
    }) {
        this.name = model.name;
        this.username = model.username;
        this.bio = model.bio;
        this.links = model.links;
    }
}