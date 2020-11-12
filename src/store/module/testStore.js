import { observable, action } from 'mobx';

const testStore = observable.object({
  count: 1,
  get realCount() {
    return `${this.count}garrett`;
  },
  setCount() {
    this.count += 1;
  },
}, {
  setCount: action,
});

export default testStore;
