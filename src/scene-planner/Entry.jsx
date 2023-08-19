import React from 'react';
import {PageHeader} from 'antd';
import {useMatch, useNavigate, Outlet} from 'react-router-dom';

export default function Entry() {
  const navigate = useNavigate();
  const {params} = useMatch('/tools/scene-planner/:sceneId') || {params: {}};

  return (
    <React.Fragment>
      <PageHeader
        title={'Scene Planner'}
        onBack={params.sceneId ? () => navigate('.') : undefined}
      />
      <Outlet/>
    </React.Fragment>
  )
}