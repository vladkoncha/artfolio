import React, {useContext} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import Loader from "./UI/loader/Loader";
import {Context} from "../index";
import {privateRoutes, publicRoutes} from "../router/routes";
import {observer} from "mobx-react-lite";

const AppRouter = () => {
    const {store} = useContext(Context);

    if (store.isLoading) {
        return <Loader/>;
    }

    return (
        store.isAuth
            ? (<Routes>
                    {privateRoutes.map(route => (
                        <Route key={route.path} path={route.path} element={<route.component/>}></Route>))}
                    <Route path="/login" element={<Navigate to={`/${store.user.username}`} replace={true}/>}></Route>
                    <Route path="/*" element={<Navigate to={`/${store.user.username}`} replace={true}/>}></Route>
                </Routes>

            )
            : (
                <Routes>
                    {publicRoutes.map(route => (
                        <Route key={route.path} path={route.path} element={<route.component/>}></Route>))}
                    <Route path="/*" element={<Navigate to="/login" replace={true}/>}></Route>
                </Routes>
            )
    );
};

export default observer(AppRouter);