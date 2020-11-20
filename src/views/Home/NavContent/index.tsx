import React, { ReactElement, useState, useRef } from 'react';
import { observer } from 'mobx-react';
import { PlusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Button, Form, Input, message, Modal, Select, Divider,
} from 'antd';
import findIndex from '@/helper/findIndex';
import homeStore from '@/store/module/homeStore';
import NavItem, { NavItemBase } from '../NavItem';
import './navContent.styl';

const { Item: FormItem } = Form;
const { Option } = Select;

interface DeleteNavItem {
  key: string;
  id: number;
}

interface AddNewNavItemParameter {
  name: string;
  url: string;
  image: string;
  type: string;
}

const NavContent = (): ReactElement => {
  const [form] = Form.useForm();
  const { navigationList } = homeStore;
  const selectRenderInputRef = useRef<Input>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [editNavId, setEditNavId] = useState(0);
  const [navItemType, setNavItemType] = useState<string []>([]);
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
    const {
      name, url, image, type,
    } = form.getFieldsValue();
    if (isEdit) {
      updateNavList({ linkUrl: url, imageUrl: image, text: name });
    } else {
      addNewNavItem({
        name, url, image, type,
      });
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

  const addNewNavItem = ({
    name, url, image, type,
  }: AddNewNavItemParameter): void => {
    if (!navigationList[type]) {
      navigationList[type] = [];
    }
    navigationList[type].push({
      linkUrl: url,
      imageUrl: image,
      text: name,
    });
    homeStore.setNavigationList(navigationList);
    modalClose();
  };

  // 新增按钮
  const addNewNavItemButton = (): void => {
    setNavItemType(Object.keys(navigationList));
    setEditDialogVisible(true);
  };

  // 添加标签类型
  const addNewNavItemType = (): void => {
    const selectRenderInputVal = selectRenderInputRef.current;
    if (selectRenderInputVal) {
      setNavItemType([...navItemType, selectRenderInputVal?.state.value]);
    } else {
      message.error('不能添加空选项！');
    }
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
      <div className="nav-wrapper__navContent" key={key}>
        <div className="nav-wrapper__navContent__title">
          <b>{key}</b>
        </div>

        <div className="nav-wrapper__navContent__detail">
          {itemList}
        </div>
      </div>
    );
  });

  const selectDropRender = (menu: ReactElement): ReactElement => (
    <div>
      {menu}
      <Divider style={{ margin: '10px 0' }} />
      <div className="flex justify-between nav-wrapper__select-render">
        <Input ref={selectRenderInputRef} />
        <Button type="link" onClick={addNewNavItemType}>
          <PlusOutlined />
          新增
        </Button>
      </div>
    </div>
  );

  return (
    <div className="nav-wrapper">
      <div className="nav-wrapper__operate">
        <PlusCircleOutlined
          className="nav-wrapper__add"
          title="新增标签"
          onClick={addNewNavItemButton}
        />
      </div>

      {list}

      <Modal
        title={`${isEdit ? '编辑' : '新增'}标签`}
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
          {isEdit ? null : (
            <FormItem label="类别" name="type">
              <Select dropdownRender={selectDropRender}>
                {navItemType.map((type) => (
                  <Option key={type} value={type}>{type}</Option>
                ))}
              </Select>
            </FormItem>
          )}
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
