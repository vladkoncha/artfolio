import React, {forwardRef, Ref} from 'react';
import classes from './CustomInput.module.css';

const CustomInput = forwardRef((props: any, ref: Ref<any>) => {
    let inputClasses = [classes.customInput];
    if (props?.type === 'email') {
        inputClasses.push(classes.login);
    }
    if (props?.type === 'password') {
        inputClasses.push(classes.password);
    }
    return (
        <input ref={ref}
               className={inputClasses.join(' ')}
               {...props}/>
    );
});

export default CustomInput;