import React, { ReactElement } from 'react';
import loadable from '@loadable/component';
import { linkList } from './contants';
import { NavItemProps } from './NavItem/index';
import './index.styl';

const NavContent = loadable(() => import('./NavContent'));

export interface LinkListItem{
  title: string;
  details: NavItemProps[];
}

export default function Home(): ReactElement {
  const navContentList = linkList.map((item) => {
    const { title, details } = item;
    return <NavContent title={title} details={details} key={title} />;
  });

  return (
    <div className="home">
      {navContentList}
    </div>
  );
}
