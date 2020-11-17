import React, { ReactElement } from 'react';
import NavItem, { NavItemBase } from '../NavItem';
import './navContent.styl';

export interface NavContentProps{
  title: string;
  details: NavItemBase[];
}

export default function NavContent(props: NavContentProps): ReactElement {
  const { title, details } = props;

  const navItemList = details.map((item) => {
    const { linkUrl, imageUrl, text } = item;
    return (
      <NavItem
        linkUrl={linkUrl}
        imageUrl={imageUrl}
        text={text}
        key={text}
        titleKey={title}
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
