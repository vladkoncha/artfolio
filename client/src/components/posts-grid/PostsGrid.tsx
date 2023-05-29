import React, {useEffect, useState} from 'react';
import Post from "../post/Post";
import {useFetch} from "../../hooks/useFetch";
import PostService from "../../services/PostService";
import Loader from "../UI/loader/Loader";
import classes from "./PostsGrid.module.scss";

const PostsGrid = () => {
    const [posts, setPosts] = useState<any[]>([]);
    const [fetchPosts, isLoading, postsError] = useFetch(async () => {
        const newPosts = await PostService.getAll();
        setPosts([...posts, ...newPosts]);
    });

    useEffect(() => {
        void fetchPosts();
    }, []);

    if (isLoading) {
        return (
            <Loader/>
        );
    }

    return (
        <div className={classes.postsGrid}>
            {posts.map(post => (
                <Post key={post.id}
                      src={`https://picsum.photos/id/${post.id}/2000`}
                      date={new Date()}
                      title={post.title.slice(0, 32)}/>
            ))}
        </div>
    );
};

export default PostsGrid;