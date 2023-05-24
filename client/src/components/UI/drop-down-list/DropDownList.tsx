import React, {MouseEvent, ReactNode, useEffect, useRef, useState} from 'react';
import classes from './DropDownList.module.scss';
import CustomButton, {ButtonClass} from "../../UI/button/CustomButton";
import {CSSTransition} from 'react-transition-group';

interface LinksListProps {
    buttonCaption: string;
    listItems: ReactNode[];
}


const DropDownList = ({buttonCaption,listItems}: LinksListProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const listRef = useRef<HTMLUListElement>(null);

    const handleClickOutside = (event: Event) => {
        if (listRef.current && !listRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const toggleList = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setIsOpen(!isOpen);
    };

    return (
        <div className={classes.listContainer}>
            <CustomButton onClick={toggleList} buttonClass={ButtonClass.PRIMARY}>
                {buttonCaption}
            </CustomButton>
            <CSSTransition
                in={isOpen}
                timeout={200}
                classNames={{
                    enter: classes.listEnter,
                    enterActive: classes.listEnterActive,
                    exit: classes.listExit,
                    exitActive: classes.listExitActive,
                }}
                unmountOnExit
            >
                <ul
                    className={classes.list}
                    ref={listRef}>
                    {listItems.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </CSSTransition>
        </div>
    );
};

export default DropDownList;
