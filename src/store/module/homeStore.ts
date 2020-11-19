import { observable, action } from 'mobx';
import { DEFAULT_LINK_LIST } from '@/views/Home/contants';
import { LinkList } from '@/views/Home';
import { NAVIGATION_LIST_KEY } from '@/constants/localstorageKeys';

// 暂时性方案，给列表加ID作为唯一标识
const initListId = (list: LinkList) => {
  let id = 1;
  return Object.keys(list).reduce((acc: LinkList, key) => {
    // eslint-disable-next-line no-plusplus
    acc[key] = list[key].map((item) => Object.assign(item, { id: id++ }));
    return acc;
  }, {});
};

// 列表初始化
const initNavigationList = () => {
  const localNavigationList = localStorage.getItem(NAVIGATION_LIST_KEY);
  if (!localNavigationList) {
    localStorage.setItem(NAVIGATION_LIST_KEY, JSON.stringify(initListId(DEFAULT_LINK_LIST)));
  }
  return localNavigationList ? initListId(JSON.parse(localNavigationList)) : DEFAULT_LINK_LIST;
};

const homeStore = observable.object({
  navigationList: initNavigationList(),

  setNavigationList(list: LinkList) {
    this.navigationList = list;
    localStorage.setItem(NAVIGATION_LIST_KEY, JSON.stringify(list));
  },
}, {
  setNavigationList: action,
});

export default homeStore;
