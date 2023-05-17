import React, {useContext} from 'react';
import classes from './Profile.module.scss';
import CustomButton, {ButtonClass} from "../button/CustomButton";
import {Context} from "../../index";
import {useNavigate} from "react-router-dom";
import LinksList from "../links-list/LinksList";

const Profile = () => {
    const navigate = useNavigate();
    const {store} = useContext(Context);

    return (
        <div className={classes.profileContainer}>
            <div className={classes.bannerImage}></div>

            <section className={classes.profileInfo}>
                <div className={classes.topContainer}>
                    <div className={classes.profileImage}></div>
                    <LinksList links={store.user.links}/>
                    <CustomButton
                        buttonClass={ButtonClass.SECONDARY}
                        onClick={() => navigate('/edit')}>
                        Edit
                    </CustomButton>
                </div>

                <p><b>{store.user.name}</b></p>
                <p><i>@{store.user.username}</i></p>
                <p>{store.user.bio}</p>
            </section>
        </div>
    );
};

export default Profile;