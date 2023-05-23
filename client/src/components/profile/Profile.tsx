import React, {useContext, useEffect, useState} from 'react';
import classes from './Profile.module.scss';
import CustomButton, {ButtonClass} from "../UI/button/CustomButton";
import {Context} from "../../index";
import {useNavigate, useParams} from "react-router-dom";
import LinksList from "../links-list/LinksList";
import UserService from "../../services/UserService";
import {IPublicUser} from "../../models/IPublicUser";
import {useFetch} from "../../hooks/useFetch";
import Loader from "../UI/loader/Loader";
import PostsForm from "../posts-form/PostsForm";

const Profile = () => {
    const {username} = useParams();
    const {store} = useContext(Context);
    const navigate = useNavigate();
    const [user, setUser] = useState<IPublicUser | null>(null);
    const [fetchUserByUsername, isLoading, error] = useFetch(async (username: string) => {
        const response = await UserService.getUserByUsername(username);
        setUser(response.data);
    }, true);

    useEffect(() => {
        void fetchUserByUsername(username);
    }, []);

    if (isLoading) {
        return (
            <Loader/>
        );
    }

    return (
        <div className={classes.profileContainer}>
            <div className={classes.bannerImage}></div>

            <section className={classes.profileInfo}>
                <div className={classes.topContainer}>
                    <div className={classes.profileImage}></div>
                    <div className={classes.nameContainer}>
                        {user?.name && user?.name !== ""
                            ? <p><b>{user?.name}</b></p>
                            : user && <p><b>{user?.username[0].toUpperCase() + user?.username.slice(1)}</b></p>}
                        <p>@{user?.username}</p>
                    </div>
                    {user && user.links.length > 0
                        && <LinksList links={user.links}/>}

                    {store.user.username === user?.username
                        &&
                        <CustomButton
                            buttonClass={ButtonClass.SECONDARY}
                            onClick={() => navigate('/edit')}>
                            Edit
                        </CustomButton>}
                </div>

                <p>{user?.bio}</p>
            </section>

            <PostsForm/>
        </div>
    );
};

export default Profile;