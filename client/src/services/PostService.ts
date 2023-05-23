import axios from "axios";

export default class PostService {
    static async getAll() {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(`${response.status} ${response.statusText}`);
        }
    }

    static async getById(id: number) {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(`${response.status} ${response.statusText}`);
        }
    }
}