import React from 'react';
import classes from './Loader.module.scss'

const Loader = () => {
    return (
        <div className={classes.loaderContainer}>
            <div className={classes.loader}>
            </div>
        </div>

    );
};

export default Loader;