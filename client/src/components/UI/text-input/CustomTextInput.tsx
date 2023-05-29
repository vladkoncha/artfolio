import React, {forwardRef, Ref, InputHTMLAttributes, useRef} from 'react';
import classes from './CustomTextInput.module.scss';

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    name: string;
    type?: HTMLInputElement['type'];
}

const CustomTextInput = forwardRef<HTMLInputElement, CustomInputProps>(
    (props: CustomInputProps, ref: Ref<HTMLInputElement>) => {
        const containerRef = useRef<HTMLDivElement>(null);

        let inputClasses = new Set([classes.customInput]);
        if (props.className) {
            [...props?.className.split(' ')]
                .reduce((inputClasses, item) => inputClasses.add(item), inputClasses);
        }
        if (props?.type === 'email') {
            inputClasses.add(classes.login);
        }
        if (props?.type === 'password') {
            inputClasses.add(classes.password);
        }

        const handleClick = () => {
            if (containerRef.current !== null) {
                containerRef.current.querySelector('input')?.focus();
            }
        };

        return (
            <div className={classes.inputContainer} ref={containerRef} onClick={handleClick}>
                <label htmlFor={props.name}>{props.label}</label>
                <input {...props} name={props.name} ref={ref} className={Array.from(inputClasses).join(' ')}/>
            </div>
        );
    }
);

export default CustomTextInput;
