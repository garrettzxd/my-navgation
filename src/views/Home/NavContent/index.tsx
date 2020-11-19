import React, { ReactElement, useState } from 'react';
import { observer } from 'mobx-react';
import {
  Button, Form, Input, message, Modal,
} from 'antd';
import findIndex from '@/helper/findIndex';
import homeStore from '@/store/module/homeStore';
import NavItem, { NavItemBase } from '../NavItem';
import './navContent.styl';

const { Item: FormItem } = Form;

interface DeleteNavItem {
  key: string;
  id: number;
}

const NavContent = (): ReactElement => {
  const [form] = Form.useForm();
  const { navigationList } = homeStore;
  const [isEdit, setIsEdit] = useState(false);
  const [editNavId, setEditNavId] = useState(0);
  const [editDialogVisible, setEditDialogVisible] = useState(false);

  // 子组件删除回调
  const deleteNavItem = ({ id, key }: DeleteNavItem): void => {
    const index = findIndex({
      source: homeStore.navigationList[key],
      key: 'id',
      value: id,
    });
    navigationList[key].splice(index, 1);
    homeStore.setNavigationList({ ...navigationList });
    message.success('已删除');
  };

  // 子组件编辑回调
  const editNavItem = (data: NavItemBase):void => {
    const {
      linkUrl, imageUrl, text, id,
    } = data;

    setEditDialogVisible(true);
    setIsEdit(true);
    setEditNavId(id || 0);

    form.setFieldsValue({
      name: text,
      image: imageUrl,
      url: linkUrl,
    });
  };

  // 关闭弹窗
  const modalClose = (): void => {
    setEditDialogVisible(false);
    setIsEdit(false);
    form.resetFields();
  };

  // 弹窗确认
  const modalConfirm = (): void => {
    const { name, url, image } = form.getFieldsValue();
    if (isEdit) {
      updateNavList({ linkUrl: url, imageUrl: image, text: name });
    }
  };

  // 编辑更新
  const updateNavList = ({ linkUrl, imageUrl, text }: NavItemBase): void => {
    Object.keys(navigationList).forEach((key) => {
      navigationList[key].forEach((item) => {
        if (editNavId === item.id) {
          Object.assign(item, { linkUrl, imageUrl, text });
        }
      });
    });
    homeStore.setNavigationList({ ...navigationList });
    setEditDialogVisible(false);
    message.success('标签已更新');
  };

  // 列表render
  const list = Object.keys(navigationList).map((key) => {
    const itemList = navigationList[key].map((item) => {
      const {
        linkUrl, imageUrl, text, id,
      } = item;
      return (
        <NavItem
          linkUrl={linkUrl}
          imageUrl={imageUrl}
          text={text}
          id={id}
          key={id}
          onEdit={editNavItem}
          onDelete={() => {
            deleteNavItem({ key, id: id || 0 });
          }}
        />
      );
    });
    return (
      <div className="navContent" key={key}>
        <div className="navContent__title">
          <b>{key}</b>
        </div>

        <div className="navContent__detail">
          {itemList}
        </div>
      </div>
    );
  });

  return (
    <div>
      {list}

      <Modal
        title={isEdit ? '编辑' : '新增'}
        width="400px"
        className="home__modal"
        visible={editDialogVisible}
        footer={null}
        onCancel={modalClose}
      >
        <Form
          name="edit"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          size="middle"
          form={form}
        >
          <FormItem label="名称" name="name">
            <Input />
          </FormItem>
          <FormItem label="网址" name="url">
            <Input />
          </FormItem>
          <FormItem label="icon" name="image">
            <Input />
          </FormItem>
        </Form>
        <div
          className="home__modal__footer"
          style={{ textAlign: 'right' }}
        >
          <Button
            className="home__modal__cancel"
            onClick={() => { setEditDialogVisible(false); }}
          >
            取消
          </Button>
          <Button
            type="primary"
            onClick={modalConfirm}
          >
            确定
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default observer(NavContent);
