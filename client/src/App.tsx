import React, {useContext, useLayoutEffect} from 'react';
import './styles/App.scss';
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import CustomButton, {ButtonClass} from "./components/button/CustomButton";
import AppRouter from "./components/AppRouter";
import {BrowserRouter} from "react-router-dom";

function App() {
    const {store} = useContext(Context);

    useLayoutEffect(() => {
        if (localStorage.getItem('token')) {
            void store.checkAuth();
        } else {
            store.setLoading(false);
        }
    }, []);

    return (
        <div className='App'>
            <BrowserRouter>
                <AppRouter/>
            </BrowserRouter>

            <CustomButton
                buttonClass={ButtonClass.MAIN}
                onClick={() => store.logout()}>
                Logout
            </CustomButton>
        </div>
    );
}

export default observer(App);
