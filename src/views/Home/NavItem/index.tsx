import React, { ReactElement } from 'react';
import './navItem.styl';

export interface NavItemProps{
  linkUrl: string;
  imageUrl: string;
  text: string;
}

export default function NavItem(props: NavItemProps):ReactElement {
  const { linkUrl, imageUrl, text } = props;
  return (
    <a href={linkUrl} className="nav-item">
      <div className="nav-item__logo">
        <img src={imageUrl} alt="logo" />
      </div>
      <div className="nav-item__text"><b>{text}</b></div>
    </a>
  );
}
