import React, { ReactElement, Component } from 'react';
import { observer } from 'mobx-react';
import testStore from '@/store/module/testStore';
import homeStore from '@/store/module/homeStore';

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
      <div>{JSON.stringify(homeStore.navigationList)}</div>
    );
  }
}

export default observer(Test);
