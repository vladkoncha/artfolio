import React, {ButtonHTMLAttributes, ReactNode} from 'react';
import classes from './CustomButton.module.scss';

export enum ButtonClass {
    PRIMARY,
    SECONDARY,
    LINK,
}

const buttonClassToClassNameMap: Record<ButtonClass, string> = {
    [ButtonClass.PRIMARY]: classes.primary,
    [ButtonClass.SECONDARY]: classes.secondary,
    [ButtonClass.LINK]: classes.linkButton,
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    buttonClass: ButtonClass;
}

const CustomButton = ({children, buttonClass, type = 'button', ...props}: ButtonProps) => {
    const buttonClassName = buttonClassToClassNameMap[buttonClass] || '';

    return (
        <button type={type} {...props} className={buttonClassName}>
            {children}
        </button>
    );
};

export default CustomButton;