import { observable, configure, action } from 'mobx';

configure({ enforceActions: 'never' });

class Store {
  @observable count = 1;

  @action
  setCount = (): void => {
    this.count += 1;
    console.log(this);
  }
}

const store = new Store();

export default store;
