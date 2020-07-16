import React from 'react';
import { Layout } from 'antd';
import Header from './Header';
import Home from './Home';
import ContractNegotiationEntry from './contract-negotiation/Entry';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavMenu from "./NavMenu";

export default function Application(props) {
  return (
    <Router>
      <Layout>
        <Layout.Header className="header">
          <Switch>
            <Route render={routeProps => (<Header {...routeProps} />)} />
          </Switch>
        </Layout.Header>
        <Layout>
          <Layout.Sider width={250}>
            <Switch>
              <Route render={routeProps => (<NavMenu {...routeProps} vertical />)} />
            </Switch>
          </Layout.Sider>
          <Layout.Content className="content">
            <Switch>
              <Route path="/tools/contract-negotiation" render={routeProps => (
                  <ContractNegotiationEntry {...routeProps} />
              )} />
              <Route path="/" render={routeProps => (
                  <Home {...routeProps} />
              )} />
            </Switch>
          </Layout.Content>
        </Layout>
      </Layout>
    </Router>
  );
}