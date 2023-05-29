import React, {ButtonHTMLAttributes} from 'react';
import classes from './IconButton.module.scss';
import removeIcon from '../../../../media/icons/remove.svg';
import crossIcon from '../../../../media/icons/cross.svg';

export enum IconType {
    REMOVE,
    CLOSE
}

type iconSrcMap = { [key in IconType]: { alt: string; svg: string } };
const iconSrcMap: iconSrcMap = {
    [IconType.REMOVE]: {
        alt: 'Remove',
        svg: removeIcon,
    },
    [IconType.CLOSE]: {
        alt: 'Close',
        svg: crossIcon,
    },
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    iconType: IconType;
}

const IconButton = ({iconType, type = 'button', ...props}: ButtonProps) => {
    return (
        <button type={type} {...props} className={classes.iconButton}>
            <img alt={iconSrcMap[iconType].alt} src={iconSrcMap[iconType].svg}/>
        </button>
    );
};

export default IconButton;