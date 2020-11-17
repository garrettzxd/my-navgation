import { observable, action } from 'mobx';
import { DEFAULT_LINK_LIST } from '@/views/Home/contants';
import { LinkList } from '@/views/Home';

const homeStore = observable.object({
  navigationList: DEFAULT_LINK_LIST,
  setNavigationList(list: LinkList) {
    console.log(list, this);
    this.navigationList = list;
  },
}, {
  setNavigationList: action,
});

export default homeStore;
