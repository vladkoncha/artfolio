import React, {forwardRef, Ref, InputHTMLAttributes} from 'react';
import classes from './CustomTextArea.module.css';

// TODO: counter слов под полем, если есть лимит
const CustomTextArea = forwardRef(
    (props: InputHTMLAttributes<HTMLTextAreaElement>, ref: Ref<HTMLTextAreaElement>) => {
        return (
            <textarea className={classes.customTextArea} ref={ref} {...props} />
        );
    }
);

export default CustomTextArea;
