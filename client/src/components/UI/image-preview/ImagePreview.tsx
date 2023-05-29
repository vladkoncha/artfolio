import React from 'react';
import classes from './ImagePreview.module.scss';
import IconButton, {IconType} from "../button/icon-button/IconButton";

interface Props {
    imageUrl: string;
    onClose: () => void;
}

const ImagePreview = ({imageUrl, onClose}: Props) => {
    return (
        <div className={classes.imagePreviewContainer}>
            <IconButton onClick={onClose} iconType={IconType.REMOVE}/>
            <img src={imageUrl} alt="Preview"/>
        </div>
    );
};

export default ImagePreview;
