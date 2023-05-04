import React, {forwardRef, Ref, InputHTMLAttributes} from 'react';
import classes from './CustomInput.module.css';

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
    type?: 'email' | 'password';
}

const CustomInput = forwardRef(
    (props: CustomInputProps, ref: Ref<HTMLInputElement>) => {
        let inputClasses = [classes.customInput];
        if (props?.type === 'email') {
            inputClasses.push(classes.login);
        }
        if (props?.type === 'password') {
            inputClasses.push(classes.password);
        }
        return (
            <input ref={ref} className={inputClasses.join(' ')} {...props} />
        );
    }
);

export default CustomInput;
