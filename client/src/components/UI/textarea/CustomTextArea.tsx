import React, {forwardRef, ForwardedRef, InputHTMLAttributes} from 'react';
import classes from './CustomTextArea.module.scss';
import {Control, useWatch} from "react-hook-form";

interface TextAreaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
    maxLength?: number;
    defaultValue?: string;
    name: string;
    control: Control<any>;
}

const CustomTextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
    ({name, defaultValue, maxLength, control, ...rest},
     ref: ForwardedRef<HTMLTextAreaElement>) => {
        const areaValue = useWatch({control, name: name, defaultValue: defaultValue || ''});

        return (
            <div className={classes.areaContainer}>
                <textarea {...rest} maxLength={maxLength} name={name} className={classes.customTextArea} ref={ref}/>
                {maxLength &&
                    <p>{areaValue.length}/{maxLength}</p>}
            </div>
        );
    }
);

export default CustomTextArea;
