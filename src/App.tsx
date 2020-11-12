import React, { ReactElement } from 'react';
import loadable from '@loadable/component';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import 'antd/dist/antd.css';
import { Switch, Route, Redirect } from 'react-router-dom';

const Home = loadable(() => import('./views/Home'));
const Test = loadable(() => import('./views/Test'));

export default function App(): ReactElement {
  return (
    <ConfigProvider locale={zhCN}>
      <div className="App">
        <Switch>
          <Route path="/test">
            <Test />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Redirect to="/" />
        </Switch>
      </div>
    </ConfigProvider>
  );
}
