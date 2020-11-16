import React, { ReactElement } from 'react';
import LoadImage from '@/components/LoadImage';
import addImage from '../../../static/image/add.png';
import './navItem.styl';

export interface NavItemBase {
  linkUrl?: string;
  imageUrl?: string;
  text?: string;
}

export interface NavItemProps extends NavItemBase{
  isLink?: boolean;
  onClick?: () => void;
}

export default function NavItem(props: NavItemProps):ReactElement {
  const {
    linkUrl, imageUrl, text, isLink = true, onClick,
  } = props;
  return isLink ? (
    <a
      href={linkUrl}
      className="nav-item"
      title={text}
      target="_blank"
      rel="noreferrer"
    >
      <div className="nav-item__logo">
        <LoadImage url={imageUrl || ''} alt={text || ''} />
      </div>
      <div className="nav-item__text"><b>{text}</b></div>
    </a>
  ) : (
    <div
      className="nav-item not-focus"
      role="button"
      tabIndex={0}
      key="nav-item"
      onClick={() => {
        if (onClick) onClick();
      }}
    >
      <div className="nav-item__logo">
        <img src={imageUrl || addImage} alt="logo" />
      </div>
      <div className="nav-item__text"><b>{text || '添加书签'}</b></div>
    </div>
  );
}
