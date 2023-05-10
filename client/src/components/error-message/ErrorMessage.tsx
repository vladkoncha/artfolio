import React, {Ref, ReactNode, CSSProperties} from 'react';
import classes from './ErrorMessage.module.css';

interface ParagraphProps {
    children: ReactNode;
    className?: string;
    style?: CSSProperties;
}

const ErrorMessage = ({children, className, style}: ParagraphProps) => {
    if (!children) {
        return <></>;
    }
    return (
        <p className={className || classes.errorMessage} style={style}>
                {children}
        </p>
    );
};

export default ErrorMessage;
