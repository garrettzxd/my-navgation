import React, { ReactElement, MouseEvent, useState } from 'react';
import { message } from 'antd';
import findIndex from '@/helper/findIndex';
import homeStore from '@/store/module/homeStore';
import LoadImage from '@/components/LoadImage';
import editImage from '@/static/image/edit.png';
import closeWhite from '@/static/image/close-white.png';
import './navItem.styl';

export interface NavItemBase {
  linkUrl?: string;
  imageUrl?: string;
  text?: string;
}

export interface NavItemProps extends NavItemBase{
  onEdit?: (data: NavItemBase) => void;
  onDelete?: (data: NavItemBase) => void;
  titleKey: string;
}

function NavItem(props: NavItemProps):ReactElement {
  const {
    linkUrl, imageUrl, text, titleKey,
  } = props;
  const { navigationList } = homeStore;

  const [overflowVisible, setOverflowVisible] = useState(false);
  const [overflowOffsetY, setOverflowOffsetY] = useState(100);

  // 编辑显影按钮
  const handleEditClick = (e: MouseEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setOverflowVisible(true);
    setOverflowOffsetY(0);
  };

  // 编辑层关闭按钮
  const editClose = (): void => {
    setOverflowVisible(false);
    setOverflowOffsetY(100);
  };

  const navItemEdit = ():void => {
    //
  };

  const navItemDelete = (): void => {
    const index = findIndex({
      source: homeStore.navigationList[titleKey],
      key: 'linkUrl',
      value: linkUrl,
    });
    navigationList[titleKey].splice(index, 1);
    homeStore.setNavigationList({ ...navigationList });
    message.success(`已删除${text}`);
  };

  return (
    <div className="nav-item">
      <a
        href={linkUrl}
        className="nav-item__link"
        title={text}
        target="_blank"
        rel="noreferrer"
      >
        <div className="nav-item__logo">
          <LoadImage url={imageUrl || ''} alt={text || ''} />
        </div>
        <div className="nav-item__text"><b>{text}</b></div>

        <div
          className="nav-item__edit not-focus"
          onClick={handleEditClick}
          role="button"
          tabIndex={0}
        >
          <img src={editImage} width="10px" height="10px" alt="edit" />
        </div>
      </a>

      <div
        className="nav-item__overflow flex column justify-center"
        style={{ visibility: overflowVisible ? 'visible' : 'hidden', top: `${overflowOffsetY}px` }}
      >
        <div
          className="nav-item__overflow__edit not-focus"
          onClick={navItemEdit}
          role="button"
          tabIndex={0}
        >
          编辑
        </div>
        <div
          className="nav-item__overflow__edit not-focus"
          onClick={navItemDelete}
          role="button"
          tabIndex={0}
        >
          删除
        </div>

        <div
          className="nav-item__overflow__image-content not-focus"
          onClick={editClose}
          role="button"
          tabIndex={0}
          title="关闭"
        >
          <img
            className="nav-item__overflow__image"
            src={closeWhite}
            alt="关闭"
          />
        </div>
      </div>
    </div>
  );
}

export default NavItem;
