import React, { ReactElement, useState } from 'react';
import { Popover, Input, Button } from 'antd';
import { LinkListItem } from '../index';
import NavItem, { NavItemBase } from '../NavItem';
import './navContent.styl';

export interface NavContentProps extends LinkListItem{
  onAdd?: (data: NavItemBase) => void;
}

export default function NavContent(props: NavContentProps): ReactElement {
  const [popoverVisible, setPopoverVisible] = useState(false);
  const [websiteName, setWebsiteName] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');

  const { title, details } = props;

  const addNewMark = () => {
    console.log(websiteName, websiteUrl);
  };

  /** 新增popover */
  const addNewContent = (
    <div>
      <Input
        value={websiteName}
        placeholder="书签名称"
        className="navContent__input"
        onChange={(e) => {
          setWebsiteName(e.target.value);
        }}
      />
      <Input
        value={websiteUrl}
        placeholder="网站地址"
        className="navContent__input"
        onChange={(e) => {
          setWebsiteUrl(e.target.value);
        }}
      />
      <Button type="primary" className="navContent__button" onClick={addNewMark}>
        新增
      </Button>
    </div>
  );

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

        <Popover
          title="新增书签"
          content={addNewContent}
          trigger="click"
          placement="bottom"
          onVisibleChange={(visible) => {
            if (!visible) {
              setWebsiteName('');
              setWebsiteUrl('');
            }
          }}
        >
          <NavItem
            isLink={false}
            onClick={() => {
              setPopoverVisible(!popoverVisible);
            }}
          />
        </Popover>
      </div>
    </div>
  );
}
