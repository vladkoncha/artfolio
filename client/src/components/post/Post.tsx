import React from 'react';
import classes from './Post.module.scss';
import LazyImage from "../UI/lazy-image/LazyImage";

interface PostProps {
    title: string;
    date: Date;
    src: string;
}


const Post = ({title, date, src}: PostProps) => {
    const formattedDate = date.toLocaleString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });

    return (
        <div className={classes.postContainer}>
            <div className={classes.postDescriptionContainer}>
                <p>{title}</p>
                <p>{formattedDate}</p>
            </div>
            <LazyImage alt={title} src={src}/>
        </div>
    );
};

export default Post;