import React, {MouseEvent, useEffect, useRef, useState} from 'react';
import classes from './LinksList.module.scss';
import {ILink} from "../../models/IUser";

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
            <button onClick={toggleList}>
                {'Links'}
            </button>
            {isOpen && (
                <ul
                    className={classes.linksList}
                    ref={listRef}
                >
                    {links.map(link => {
                        return (
                            <li key={link.name}>
                                <button
                                    onClick={() => handleLinkClick(link.url)}
                                >
                                    {link.name}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

export default LinkList;
