import React, {useContext, useLayoutEffect} from 'react';
import LoginForm from "./components/form/LoginForm";
import './App.css';
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import CustomButton, {ButtonClass} from "./components/button/CustomButton";
import EditProfileForm from "./components/edit-profile-form/EditProfileForm";

function App() {
    const {store} = useContext(Context);

    useLayoutEffect(() => {
        if (localStorage.getItem('token')) {
            void store.checkAuth();
        } else {
            store.setLoading(false);
        }
    }, []);

    if (!store.isAuth && !store.isLoading) {
        return (
            <div className="App">
                <LoginForm/>
            </div>
        );
    }

    return (
        <div>
            {store.isAuth
                ? <EditProfileForm/>
                // ? <>
                //     <h1>Пользователь авторизован {store.user.email}</h1>
                //     <h1>
                //         {store.user.isActivated
                //             ? 'Аккаунт подтвержден'
                //             : 'Подтвердите аккаунт'}
                //     </h1>
                // </>
                : store.isLoading && <h1>Подождите...</h1>}

            <CustomButton
                buttonClass={ButtonClass.MAIN}
                onClick={() => store.logout()}>
                Logout
            </CustomButton>
        </div>
    );
}

export default observer(App);
