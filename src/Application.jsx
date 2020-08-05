import React from 'react';
import {Layout, Spin} from 'antd';
import Header from './Header';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import NavMenu from "./NavMenu";

const SceneNegotiationEntry = React.lazy(() =>
  import(/* webpackChunkName: "SceneNegatiation", webpackPrefetch: true */ './scene-negotiation/Entry')
);

const Home = React.lazy(() =>
  import(/* webpackChunkName: "Home", webpackPrefetch: true */ './Home')
);


export default function Application(props) {
  return (
    <Router>
      <Layout>
        <Layout.Header className="header">
          <Switch>
            <Route render={routeProps => (<Header {...routeProps} />)}/>
          </Switch>
        </Layout.Header>
        <Layout>
          <Layout.Sider width={250}>
            <Switch>
              <Route render={routeProps => (<NavMenu {...routeProps} vertical/>)}/>
            </Switch>
          </Layout.Sider>
          <Layout.Content className="content">
            <React.Suspense fallback={<Spin />}>
              <Switch>
                <Route path="/tools/scene-negotiation" render={routeProps => (
                  <SceneNegotiationEntry {...routeProps} />
                )}/>
                <Route path="/" render={routeProps => (
                  <Home {...routeProps} />
                )}/>
              </Switch>
            </React.Suspense>
          </Layout.Content>
        </Layout>
      </Layout>
    </Router>
  );
}