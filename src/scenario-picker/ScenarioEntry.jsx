import React from 'react';
import {Col, Row} from "antd";
import {useMatch} from "react-router-dom";
import ScenarioSpecs from "./ScenarioSpecs";
import ScenarioAuthor from "./ScenarioAuthor";
import scenarioData from "./scenarios/scenario-index";

export default function ScenarioEntry() {
    const scenarioMap = {};
    scenarioData.forEach(value => {
        scenarioMap[value.path] = value;
    });

    const {params} = useMatch('tools/bdsm-scenarios/:type');
    const {type} = params;
    const {Component, ...scene} = scenarioMap[type];

    return (
        <>
            <ScenarioSpecs scene={scene}/>
            <Row><Col xs={24} md={16}>
                <Component scene={scene}/>
            </Col></Row>
            <ScenarioAuthor scene={scene}/>
        </>
    );
}