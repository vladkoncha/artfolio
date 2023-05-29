import React from 'react';
import ProfileInfo from "../profile-info/ProfileInfo";
import PostsGrid from "../posts-grid/PostsGrid";
import classes from "./Profile.module.scss";

const Profile = () => {
    return (
        <div className={classes.profileContainer}>
            <ProfileInfo/>
            <PostsGrid/>
        </div>
    );
};

export default Profile;