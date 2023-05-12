import React, {ButtonHTMLAttributes, ReactNode} from 'react';
import classes from './CustomButton.module.scss';

//TODO: классы — primary, secondary, link
export enum ButtonClass {
    MAIN,
    LINK,
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    buttonClass: ButtonClass;
}

const CustomButton = ({children, buttonClass, type = 'button', ...props}: ButtonProps) => {
    const buttonClassName =
        buttonClass === ButtonClass.MAIN ? classes.main : classes.linkButton;

    return (
        <button type={type} {...props} className={buttonClassName}>
            {children}
        </button>
    );
};

export default CustomButton;