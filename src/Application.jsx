import React from 'react';
import { Card, Row, Col } from 'antd';
import Header from './Header';
import Home from './Home';
import ContractNegotiationEntry from './contract-negotiation/Entry';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

export default function Application(props) {
  return (
      <Router>
        <React.Fragment>
          <Switch>
            <Route render={routeProps => (
                <Header {...routeProps} />
            )} />
          </Switch>
          <Row justify="center" align="top">
            <Col span={16}>
              <Card className="middle" style={{ marginTop: -5, zIndex: -1 }}>
                <Switch>
                  <Route exact path="/" rener={routeProps => (
                      <Home {...routeProps} />
                  )} />
                  <Route path="/contract-negotiation" rener={routeProps => (
                      <ContractNegotiationEntry {...routeProps} />
                  )} />
                </Switch>
              </Card>
            </Col>
          </Row>
        </React.Fragment>
      </Router>
  );
}