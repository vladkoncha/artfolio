import React, {ReactNode} from 'react';
import classes from './Modal.module.scss';
import IconButton, {IconType} from "../button/icon-button/IconButton";

interface ModalProps {
    children: ReactNode;
    visible: boolean;
    setVisible: Function;
}

const Modal = ({children, visible, setVisible}: ModalProps) => {
    const rootClasses = [classes.modal];
    if (visible) {
        rootClasses.push(classes.active);
    }

    return (
        <div
            className={rootClasses.join(' ')}
            onClick={() => setVisible(false)}
        >
            <IconButton onClick={() => setVisible(false)} iconType={IconType.CLOSE}/>
            <div
                className={classes.modalContent}
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
};

export default Modal;