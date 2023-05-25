import React, {useContext} from "react";
import classes from './Header.module.scss';
import CustomInput from "../UI/input/CustomInput";
import CustomButton, {ButtonClass} from "../UI/button/CustomButton";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";

const Header = () => {
    const {store} = useContext(Context);
    const navigate = useNavigate();

    return (
        <div className={classes.headerContainer}>
            <a href="/" className={classes.homeLink}>Artfolio</a>
            <CustomInput name="search" type="text" placeholder="Search"/>
            <div className={classes.buttonsContainer}>
                {store.isAuth
                    ? (<><CustomButton
                        buttonClass={ButtonClass.PRIMARY}
                        onClick={async () => {
                            await store.logout();
                            navigate(`/login`);
                        }}>
                        Logout
                    </CustomButton></>)
                    : (<>
                        <CustomButton
                            onClick={() => navigate(`/login`)}
                            buttonClass={ButtonClass.PRIMARY}
                        >Log in</CustomButton>
                    </>)
                }
            </div>
        </div>
    );
};


export default observer(Header);
