import React, { ReactElement } from 'react';
import loadable from '@loadable/component';
import { NavItemBase } from './NavItem/index';
import './index.styl';

const NavContent = loadable(() => import('./NavContent'));
const Search = loadable(() => import('./Search'));

export interface LinkList {
  [title: string]: NavItemBase[];
}

function Home(): ReactElement {
  return (
    <div className="home">
      <header className="home__header flex align-center direction-right">
        <Search />
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
