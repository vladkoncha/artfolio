import React from 'react';
import classes from './CustomButton.module.css';
// @ts-ignore
const LinkButton = ({children, ...props}) => {
    return (
        <button {...props} className={classes.linkButton}>
            {children}
        </button>
    );
};

export default LinkButton;