import React, {ReactNode} from 'react';
import classes from './CustomButton.module.css';

export enum ButtonClass {
    MAIN,
    LINK,
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
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