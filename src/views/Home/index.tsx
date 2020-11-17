import React, { ReactElement } from 'react';
import { observer } from 'mobx-react';
import loadable from '@loadable/component';
import homeStore from '@/store/module/homeStore';
import { NavItemBase } from './NavItem/index';
import './index.styl';

const NavContent = loadable(() => import('./NavContent'));

export interface LinkList {
  [title: string]: NavItemBase[];
}

function Home(): ReactElement {
  const { navigationList } = homeStore;

  // eslint-disable-next-line
  const navContentList = Object.keys(navigationList).map((key) => {
    return <NavContent title={key} details={navigationList[key]} key={key} />;
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

        <div className="home__body__right">
          right
        </div>
      </div>
    </div>
  );
}

export default observer(Home);
