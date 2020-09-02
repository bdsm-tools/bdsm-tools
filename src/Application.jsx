import React from 'react';
import {Layout, Spin} from 'antd';
import Header from './Header';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import NavMenu from "./NavMenu";
import Analytics from "./services/Analytics";
import ConsentModal from "./ConsentModal";

const SceneNegotiationEntry = React.lazy(() =>
  import(/* webpackChunkName: "SceneNegatiation", webpackPrefetch: true */ './scene-negotiation/Entry')
);

const AboutEntry = React.lazy(() =>
  import(/* webpackChunkName: "About", webpackPrefetch: true */ './about/Entry')
);

const FaqEntry = React.lazy(() =>
  import(/* webpackChunkName: "FAQ", webpackPrefetch: true */ './about/Faq')
);

const Home = React.lazy(() =>
  import(/* webpackChunkName: "Home", webpackPrefetch: true */ './Home')
);

export default function Application() {
  return (
    <Router>
      <ConsentModal />
      <Switch>
        <Route render={routeProps => (<Analytics {...routeProps} />)}/>
      </Switch>
      <Layout>
        <Layout.Header className="header">
          <Switch>
            <Route render={routeProps => (<Header {...routeProps} />)}/>
          </Switch>
        </Layout.Header>
        <Layout.Content style={{ paddingTop: 64 }}>
          <Layout>
            <Layout.Sider width={250} style={{ height: '100%' }}>
              <Switch>
                <Route render={routeProps => (<NavMenu {...routeProps} vertical/>)}/>
              </Switch>
            </Layout.Sider>
            <Layout.Content className="content">
              <React.Suspense fallback={<Spin size="large" />}>
                <Switch>
                  <Route path="/tools/scene-negotiation" render={routeProps => (
                    <SceneNegotiationEntry {...routeProps} />
                  )}/>
                  <Route path="/about/faq" render={routeProps => (
                    <FaqEntry {...routeProps} />
                  )}/>
                  <Route path="/about/info" render={routeProps => (
                    <AboutEntry {...routeProps} />
                  )}/>
                  <Route path="/" render={routeProps => (
                    <Home {...routeProps} />
                  )}/>
                </Switch>
              </React.Suspense>
            </Layout.Content>
          </Layout>
        </Layout.Content>
      </Layout>
    </Router>
  );
}