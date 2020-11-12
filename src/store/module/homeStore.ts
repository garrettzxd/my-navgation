import { observable, action, computed } from 'mobx';

class HomeStore {
  @observable name = 'garrett';

  @computed get upperCaseName() {
    return this.name.toUpperCase();
  }

  @action setName = (name: string) => {
    this.name = name;
  }
}

export default new HomeStore();
