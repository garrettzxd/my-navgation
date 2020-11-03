import React, { ReactElement } from 'react';
import { LinkListItem } from '../index';
import NavItem from '../NavItem';
import Dialog from '../../../components/Dialog';
import './navContent.styl';

export default function NavContent(props: LinkListItem): ReactElement {
  const { title, details } = props;

  const navItemList = details.map((item) => {
    const { linkUrl, imageUrl, text } = item;
    return <NavItem linkUrl={linkUrl} imageUrl={imageUrl} text={text} key={linkUrl} />;
  });

  return (
    <div className="navContent">
      <div className="navContent__title">
        <b>{title}</b>
      </div>

      <div className="navContent__detail">
        {navItemList}
        <NavItem isLink={false} onClick={() => { console.log('click'); }} />
      </div>

      <Dialog title="测试" />
    </div>
  );
}
