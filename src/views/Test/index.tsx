import React, { ReactElement, Component } from 'react';
import { observer } from 'mobx-react';
import testStore from '@/store/module/testStore';

class Test extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  private setCount = (): void => {
    testStore.setCount();
  }

  public render(): ReactElement {
    return (
      <div>
        <h2>{testStore.count}</h2>
        <h2>{testStore.realCount}</h2>
        <button type="button" onClick={this.setCount}>
          点击
        </button>
      </div>
    );
  }
}

export default observer(Test);
