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
      <header className="home__header">
        这里是导航头部
      </header>

      <div className="home__body flex justify-between">
        <div className="home__body__left">
          {navContentList}
        </div>

        <div className="home__body__right">right</div>
      </div>
    </div>
  );
}
