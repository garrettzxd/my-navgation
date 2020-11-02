import React, { ReactElement } from 'react';
import { LinkListItem } from '../index';
import NavItem from '../NavItem';
import './navContent.styl';

export default function NavContent(props: LinkListItem): ReactElement {
  const { title, details } = props;

  const navItemList = details.map((item) => {
    const { linkUrl, imageUrl, text } = item;
    return <NavItem linkUrl={linkUrl} imageUrl={imageUrl} text={text} key={linkUrl} />;
  });

  return (
    <div className="navContent">
      <div className="flex justify-between">
        <div><b>{title}</b></div>
      </div>

      <div className="navContent__detail">{navItemList}</div>
    </div>
  );
}
