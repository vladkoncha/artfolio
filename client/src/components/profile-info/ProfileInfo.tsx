import React, {useContext, useEffect, useState} from 'react';
import classes from './ProfileInfo.module.scss';
import CustomButton, {ButtonClass} from "../UI/button/CustomButton";
import {Context} from "../../index";
import {useNavigate, useParams} from "react-router-dom";
import LinksList from "../links-list/LinksList";
import UserService from "../../services/UserService";
import {IPublicUser} from "../../models/IPublicUser";
import {useFetch} from "../../hooks/useFetch";
import Loader from "../UI/loader/Loader";
import LazyImage from "../UI/lazy-image/LazyImage";
import Modal from "../UI/modal/Modal";
import PostForm from "../post-form/PostForm";

const ProfileInfo = () => {
    const {username} = useParams();
    const {store} = useContext(Context);
    const navigate = useNavigate();
    const [newPostModal, setNewPostModal] = useState(false);
    const [user, setUser] = useState<IPublicUser | null>(null);
    const [fetchUserByUsername, isLoading, error] = useFetch(async (username: string) => {
        const response = await UserService.getUserByUsername(username);
        setUser(response.data);
    }, true);
    const ownPage = store.user.username === user?.username;

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
                    <div className={classes.profileImage}>
                        <LazyImage alt='Profile Image' src='https://picsum.photos/512'/>
                    </div>
                    {user && user.links.length > 0
                        && <LinksList links={user.links}/>}

                    {ownPage
                        &&
                        <div className={classes.ownProfileButtonsContainer}>
                            <CustomButton
                                buttonClass={ButtonClass.PRIMARY}
                                onClick={() => setNewPostModal(true)}>
                                Create
                            </CustomButton>
                            <CustomButton
                                buttonClass={ButtonClass.SECONDARY}
                                onClick={() => navigate('/edit')}>
                                Edit
                            </CustomButton>
                        </div>
                    }

                    {newPostModal &&
                        <Modal visible={newPostModal} setVisible={setNewPostModal}>
                            <PostForm/>
                        </Modal>
                    }
                </div>

                <div className={classes.nameContainer}>
                    {user?.name && user?.name !== ""
                        ? <p><b>{user?.name}</b></p>
                        : user && <p><b>{user?.username[0].toUpperCase() + user?.username.slice(1)}</b></p>}
                    <p>@{user?.username}</p>
                </div>

                <div className={classes.bioContainer}>
                    <p>{user?.bio}</p>
                </div>
            </section>
        </div>
    );
};

export default ProfileInfo;