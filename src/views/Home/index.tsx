import React, { ReactElement, useState } from 'react';
import { observer } from 'mobx-react';
import {
  Modal, Input, Form, Button, message,
} from 'antd';
import loadable from '@loadable/component';
import homeStore from '@/store/module/homeStore';
import { NavItemEditParameter } from '@/views/Home/NavContent';
import { NavItemBase } from './NavItem/index';
import './index.styl';

const NavContent = loadable(() => import('./NavContent'));
const { Item: FormItem } = Form;

export interface LinkList {
  [title: string]: NavItemBase[];
}

function Home(): ReactElement {
  const [form] = Form.useForm();
  const { navigationList } = homeStore;
  const [isEdit, setIsEdit] = useState(false);
  const [editDialogVisible, setEditDialogVisible] = useState(false);
  const [editNavId, setEditNavId] = useState(0);

  // 编辑
  const editItem = (data: NavItemEditParameter): void => {
    setEditDialogVisible(true);
    setIsEdit(true);
    const {
      linkUrl, imageUrl, text, id,
    } = data;
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

  const modalConfirm = (): void => {
    const { name, url, image } = form.getFieldsValue();
    if (isEdit) {
      updateNavList({ linkUrl: url, imageUrl: image, text: name });
    }
  };

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

  // eslint-disable-next-line
  const navContentList = Object.keys(navigationList).map((key) => {
    return (
      <NavContent
        title={key}
        details={navigationList[key]}
        key={key}
        onNavItemEdit={editItem}
      />
    );
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
          <button type="button" onClick={() => { setEditDialogVisible(true); }}>测试</button>
        </div>
      </div>

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
}

export default observer(Home);
