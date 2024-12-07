import React from 'react';
import { PageHeader } from '@ant-design/pro-components';
import { useMatch, useNavigate, Outlet } from 'react-router-dom';
import scenarioData from './scenarios/scenario-index';
import useAnalytics from '../hooks/useAnalytics';

export default function Entry() {
  useAnalytics('BDSM Scenarios');
  const navigate = useNavigate();
  const { params } = useMatch('/tools/bdsm-scenarios/:type') || { params: {} };

  const scenarioMap = {};
  scenarioData.forEach((value) => {
    scenarioMap[value.path] = value;
  });

  return (
    <React.Fragment>
      <PageHeader
        title={
          params.type
            ? scenarioMap[params.type].name || 'Unnamed Scenario'
            : 'BDSM Scenarios'
        }
        onBack={params.type ? () => navigate('.') : undefined}
      />
      <Outlet />
    </React.Fragment>
  );
}
