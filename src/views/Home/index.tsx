import React, { ReactElement } from 'react';
import loadable from '@loadable/component';
import { NavItemBase } from './NavItem/index';
import './index.styl';

const NavContent = loadable(() => import('./NavContent'));

export interface LinkList {
  [title: string]: NavItemBase[];
}

function Home(): ReactElement {
  return (
    <div className="home">
      <header className="home__header">
        这里是导航头部
      </header>

      <div className="home__body flex justify-between">
        <div className="home__body__left">
          <NavContent />
        </div>

        <div className="home__body__right">
          right
        </div>
      </div>
    </div>
  );
}

export default Home;
