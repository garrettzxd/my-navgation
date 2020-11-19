import React, { ReactElement } from 'react';
import NavItem, { NavItemBase } from '../NavItem';
import './navContent.styl';

export interface NavContentProps{
  title: string;
  details: NavItemBase[];
  onNavItemEdit: (data: NavItemEditParameter) => void;
}

export interface NavItemEditParameter extends NavItemBase{
  title: string;
}

export default function NavContent(props: NavContentProps): ReactElement {
  const { title, details, onNavItemEdit } = props;

  const editNavItem = (data: NavItemBase):void => {
    onNavItemEdit({
      title,
      ...data,
    });
  };

  const navItemList = details.map((item) => {
    const {
      linkUrl, imageUrl, text, id,
    } = item;
    return (
      <NavItem
        linkUrl={linkUrl}
        imageUrl={imageUrl}
        text={text}
        id={id}
        key={text}
        titleKey={title}
        onEdit={editNavItem}
      />
    );
  });

  return (
    <div className="navContent">
      <div className="navContent__title">
        <b>{title}</b>
      </div>

      <div className="navContent__detail">
        {navItemList}
      </div>
    </div>
  );
}
