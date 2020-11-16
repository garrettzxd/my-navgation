import React, { ReactElement, useState } from 'react';
import {
  Popover, Input, Button, message,
} from 'antd';
import CheckClass from '@/helper/CheckClass';
import NavItem, { NavItemBase } from '../NavItem';
import './navContent.styl';

export interface AddCallbackData {
  key: string;
  newNavData: NavItemBase;
}

export interface NavContentProps{
  title: string;
  details: NavItemBase[];
  onAdd?: (data: AddCallbackData) => void;
}

export default function NavContent(props: NavContentProps): ReactElement {
  const [popoverVisible, setPopoverVisible] = useState(false);
  const [websiteName, setWebsiteName] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');

  const { title, details, onAdd } = props;

  const addNewCheck = (): string => {
    const notEmptyMsg = '不能为空';
    const check = new CheckClass();
    check.add({
      value: websiteName,
      ruleList: [
        { ruleName: 'isNotEmpty', errorMsg: `标签名${notEmptyMsg}` },
        { ruleName: 'maxLength', errorMsg: '最长5个字', max: 5 },
      ],
    });
    check.add({ value: websiteUrl, ruleList: [{ ruleName: 'isNotEmpty', errorMsg: `网址${notEmptyMsg}` }] });
    return check.start();
  };

  const addNewMark = () => {
    if (!onAdd) return;

    const checkResult = addNewCheck();
    if (checkResult) {
      message.error(checkResult);
      return;
    }

    onAdd({
      key: title,
      newNavData: {
        linkUrl: websiteUrl,
        text: websiteName,
        imageUrl: '',
      },
    });
  };

  /** 新增popover */
  const addNewContent = (
    <div>
      <Input
        value={websiteName}
        size="middle"
        placeholder="书签名称"
        className="navContent__input"
        onChange={(e) => {
          setWebsiteName(e.target.value);
        }}
      />
      <Input
        value={websiteUrl}
        size="middle"
        placeholder="网站地址"
        className="navContent__input"
        onChange={(e) => {
          setWebsiteUrl(e.target.value);
        }}
      />
      <div style={{ textAlign: 'right' }}>
        <Button
          type="primary"
          className="navContent__button"
          onClick={addNewMark}
        >
          新增
        </Button>
      </div>
    </div>
  );

  const navItemList = details.map((item) => {
    const { linkUrl, imageUrl, text } = item;
    return <NavItem linkUrl={linkUrl} imageUrl={imageUrl} text={text} key={text} />;
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
          visible={popoverVisible}
          trigger="click"
          placement="bottom"
          destroyTooltipOnHide
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
