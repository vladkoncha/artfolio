import React, {useContext, useEffect} from 'react';
import LoginForm from "./components/form/LoginForm";
import './App.css';
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import CustomButton from "./components/button/CustomButton";

function App() {
    const {store} = useContext(Context);

    useEffect(() => {
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
            <h1>
                {store.isAuth
                    ? `Пользователь авторизован ${store.user.email}`
                    : 'Авторизуйтесь:'}
            </h1>
            <h1>
                {store.user.isActivated
                    ? 'Аккаунт подтвержден'
                    : 'Подтвердите аккаунт'}
            </h1>
            <CustomButton onClick={() => store.logout()}>Выйти</CustomButton>
        </div>
    );
}

export default observer(App);
