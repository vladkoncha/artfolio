import React, {forwardRef, InputHTMLAttributes} from 'react';
import classes from './ImageInput.module.scss';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    multiple: boolean;
    hidden: boolean;
}

const ImageInput = forwardRef<HTMLInputElement, Props>(({multiple, hidden, ...props}, ref) => {
    let containerClasses = classes.inputContainer;
    if (hidden) {
        containerClasses += ` ${classes.hidden}`;
    }

    return (
        <div className={containerClasses}>
            <input
                id="image"
                name="image"
                ref={ref}
                multiple={multiple}
                type="file"
                accept="image/*"
                {...props}
            />
        </div>
    );
});

export default ImageInput;
