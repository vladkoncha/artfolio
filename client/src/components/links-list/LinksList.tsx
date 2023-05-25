import React from 'react';
import {ILink} from "../../models/IUser";
import CustomButton, {ButtonClass} from "../UI/button/CustomButton";
import DropDownList from "../UI/drop-down-list/DropDownList";
import classes from "./LinksList.module.scss";

interface LinksListProps {
    links: ILink[];
}


const LinkList = ({links}: LinksListProps) => {
    const listItems = links.map(link => (
        <CustomButton
            onClick={() => window.open(link.url, '_blank')}
            buttonClass={ButtonClass.SECONDARY}
        >
            {link.name}
        </CustomButton>
    ));

    return (
        <div className={classes.linksListContainer}>
            <DropDownList listItems={listItems} buttonCaption={'Links'}/>
        </div>
    );
};

export default LinkList;
