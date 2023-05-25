import React, {useContext, useLayoutEffect} from 'react';
import './styles/App.scss';
import {Context} from "./index";
import {observer} from "mobx-react-lite";
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
        </div>
    );
}

export default observer(App);
