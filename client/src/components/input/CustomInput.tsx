import React, {Ref} from 'react';
import classes from './CustomInput.module.css';

const CustomInput = React.forwardRef((props: any, ref: Ref<any>) => {
    return (
        <input ref={ref} className={classes.customInput} {...props}/>
    );
});

export default CustomInput;