import React, {MouseEvent, ReactNode, useEffect, useRef, useState} from 'react';
import classes from './DropDownList.module.scss';
import classNames from "classnames";
import {CSSTransition} from 'react-transition-group';

interface LinksListProps {
    buttonCaption: string;
    listItems: ReactNode[];
}


const DropDownList = ({buttonCaption, listItems}: LinksListProps) => {
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

    const buttonClasses = [classes.listButton];
    if (isOpen) {
        buttonClasses.push(classes.listButtonOpen);
    }

    return (
        <div className={classes.listContainer}>
            <button
                onClick={toggleList}
                className={classNames(buttonClasses)}>
                {buttonCaption}
            </button>
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
