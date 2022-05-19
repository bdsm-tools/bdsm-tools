import React from 'react';
import {PageHeader} from 'antd';
import {useMatch, useNavigate, Outlet} from 'react-router-dom';
import scenarioData from './scenarios/scenario-index';

export default function Entry() {
    const navigate = useNavigate();
    const {params} = useMatch('/tools/bdsm-scenarios/:type') || {params: {}};

    const scenarioMap = {};
    scenarioData.forEach(value => {
        scenarioMap[value.path] = value;
    });

    return (
        <React.Fragment>
            <PageHeader
                title={params.type
                    ? scenarioMap[params.type].name || 'Unnamed Scenario'
                    : 'BDSM Scenarios'}
                onBack={params.type ? () => navigate('.') : undefined}
            />
            <Outlet/>
        </React.Fragment>
    )
}