import React from 'react';
import {PageHeader, Row, Col} from 'antd';
import ScenarioTable from "./ScenarioTable";
import scenarioData from './scenarios/scenario-index';
import {Route, Switch} from "react-router-dom";
import ScenarioSpecs from "./ScenarioSpecs";
import ScenarioAuthor from "./ScenarioAuthor";

export default function Entry(props) {
    const {match, history} = props;
    const {url} = match;

    const scenarioMap = {};
    scenarioData.forEach(value => {
        scenarioMap[value.path] = value;
    });

    return (
        <React.Fragment>
            <Switch>
                <Route path={`${url}/:type?`} render={(routeProps) => (
                    <PageHeader
                        title={routeProps.match.params.type
                            ? scenarioMap[routeProps.match.params.type].name || 'Unnamed Scenario'
                            : 'BDSM Scenarios'}
                        onBack={routeProps.match.params.type
                            ? () => history.push(url)
                            : undefined
                        }
                    />
                )}/>
            </Switch>
            <Switch>
                <Route path={`${url}/:type`} render={(routeProps) => {
                    const {type} = routeProps.match.params;
                    const {Component, ...scene} = scenarioMap[type];
                    return (
                        <>
                            <ScenarioSpecs scene={scene} {...routeProps} />
                            <Row><Col xs={24} md={16}>
                            <Component scene={scene} {...routeProps} />
                            </Col></Row>
                            <ScenarioAuthor scene={scene} {...routeProps} />
                        </>
                    );
                }}/>
                <Route path={`${url}`} render={(routeProps) => (
                    <ScenarioTable data={scenarioData} {...routeProps} />
                )}/>
            </Switch>
        </React.Fragment>
    )
}