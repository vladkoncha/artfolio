import React from 'react';
import classes from './CustomButton.module.css';
// @ts-ignore
const CustomButton = ({children, ...props}) => {
    return (
        <button {...props} className={classes.main}>
            {children}
        </button>
    );
};

export default CustomButton;