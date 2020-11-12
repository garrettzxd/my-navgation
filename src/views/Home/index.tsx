import React, { ReactElement, useState } from 'react';
import { observer } from 'mobx-react';
import loadable from '@loadable/component';
import { AddCallbackData } from '@/views/Home/NavContent';
import { DEFAULT_LINK_LIST } from './contants';
import { NavItemBase } from './NavItem/index';
import './index.styl';

const NavContent = loadable(() => import('./NavContent'));

export interface LinkList {
  [title: string]: NavItemBase[];
}

function Home(): ReactElement {
  const [markList, setMarkList] = useState(DEFAULT_LINK_LIST);

  const addNewMark = (data: AddCallbackData) => {
    const { key, newNavData } = data;
    if (markList[key]) markList[key].push(newNavData);
    setMarkList({ ...markList });
  };

  // eslint-disable-next-line
  const navContentList = Object.keys(markList).map((key) => {
    return <NavContent title={key} details={markList[key]} key={key} onAdd={addNewMark} />;
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
