import React, {MouseEvent, useEffect, useRef, useState} from 'react';
import classes from './LinksList.module.scss';
import {ILink} from "../../models/IUser";
import CustomButton, {ButtonClass} from "../button/CustomButton";
import {CSSTransition} from 'react-transition-group';

interface LinksListProps {
    links: ILink[];
}


const LinkList = ({links}: LinksListProps) => {
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

    const handleLinkClick = (link: string) => {
        window.open(link, '_blank');
    };

    return (
        <div className={classes.linksListContainer}>
            <CustomButton onClick={toggleList} buttonClass={ButtonClass.PRIMARY}>
                {'Links'}
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
                    ref={listRef}
                >
                    {links.map(link => {
                        return (
                            <li
                                key={link.name}
                                onClick={() => handleLinkClick(link.url)}
                            >
                                {link.name}
                            </li>
                        );
                    })}
                </ul>
            </CSSTransition>
        </div>
    );
};

export default LinkList;
