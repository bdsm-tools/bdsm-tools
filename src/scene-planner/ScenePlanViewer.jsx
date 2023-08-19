import React from 'react';
import { useMatch } from 'react-router-dom'
import LocalScenePlan from './LocalScenePlan'
import SharedScenePlan from './SharedScenePlan'
import { Typography } from 'antd'
import { extractPlanData } from './util'

export default function ScenePlanViewer() {

  const {params} = useMatch('/tools/scene-planner/:sceneId') || {params: {}};

  const [source, id, user] = extractPlanData(params.sceneId);

  if (source === 'local') {
    return <LocalScenePlan id={id} />;
  }
  if (source === 'shared') {
    return <SharedScenePlan id={id} user={user} />;
  }

  return (
    <Typography>
      Unknown Scene Plan Source
    </Typography>
  );
}