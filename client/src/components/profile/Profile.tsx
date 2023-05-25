import React from 'react';
import ProfileInfo from "../profile-info/ProfileInfo";
import PostsForm from "../posts-form/PostsForm";
import classes from "./Profile.module.scss";

const Profile = () => {
    return (
        <div className={classes.profileContainer}>
            <ProfileInfo/>
            <PostsForm/>
        </div>
    );
};

export default Profile;