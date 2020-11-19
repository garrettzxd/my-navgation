import React, { ReactElement, MouseEvent, useState } from 'react';
import { Button, Popover } from 'antd';
import { CloseOutlined, FormOutlined } from '@ant-design/icons';
import LoadImage from '@/components/LoadImage';
import './navItem.styl';

export interface NavItemBase {
  linkUrl?: string;
  imageUrl?: string;
  text?: string;
  id?: number;
}

export interface NavItemProps extends NavItemBase{
  onEdit: (data: NavItemBase) => void;
  onDelete: () => void;
}

interface IsShowOverflow {
  visible: boolean;
  offset: number;
}

function NavItem(props: NavItemProps):ReactElement {
  const {
    linkUrl, imageUrl, text, id, onEdit, onDelete,
  } = props;

  const [overflowVisible, setOverflowVisible] = useState(false);
  const [overflowOffsetY, setOverflowOffsetY] = useState(100);

  // 编辑显影按钮
  const handleEditClick = (e: MouseEvent<HTMLDivElement>): void => {
    e.preventDefault();
    isShowOverFlow({ visible: true, offset: 0 });
  };

  // 编辑
  const navItemEdit = ():void => {
    isShowOverFlow({ visible: false, offset: 100 });
    onEdit({
      linkUrl, imageUrl, text, id,
    });
  };

  // 遮罩层显隐
  const isShowOverFlow = ({ visible, offset }: IsShowOverflow): void => {
    setOverflowVisible(visible);
    setOverflowOffsetY(offset);
  };

  const popoverContent = (
    <div>
      <p>确认删除该标签？</p>
      <Button type="primary" size="small" onClick={onDelete}>
        删除标签
      </Button>
    </div>
  );

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
          <FormOutlined width="10px" height="10px" />
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

        <Popover
          title="确认"
          trigger="click"
          content={popoverContent}
          placement="bottom"
        >
          <div className="nav-item__overflow__edit not-focus">
            删除
          </div>
        </Popover>

        <div
          className="nav-item__overflow__image-content not-focus"
          onClick={() => { isShowOverFlow({ visible: false, offset: 100 }); }}
          role="button"
          tabIndex={0}
          title="关闭"
        >
          <CloseOutlined width="14px" height="14px" />
        </div>
      </div>
    </div>
  );
}

export default NavItem;
