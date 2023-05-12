import React, {forwardRef, Ref, InputHTMLAttributes, useRef} from 'react';
import classes from './CustomInput.module.scss';

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    name: string;
    type?: HTMLInputElement['type'];
}

const CustomInput = forwardRef<HTMLInputElement, any>(
    (props: CustomInputProps, ref: Ref<HTMLInputElement>) => {
        const containerRef = useRef<HTMLDivElement>(null);

        let inputClasses = [classes.customInput];
        if (props?.type === 'email') {
            inputClasses.push(classes.login);
        }
        if (props?.type === 'password') {
            inputClasses.push(classes.password);
        }

        const handleClick = () => {
            if (containerRef.current !== null) {
                containerRef.current.querySelector('input')?.focus();
            }
        };

        return (
            <div className={classes.inputContainer} ref={containerRef} onClick={handleClick}>
                <label htmlFor={props.name}>{props.label}</label>
                <input {...props} name={props.name} ref={ref} className={inputClasses.join(' ')}/>
            </div>
        );
    }
);

export default CustomInput;
