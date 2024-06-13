import React from 'react';
import { useMatch } from 'react-router-dom'
import SceneCanvas from './SceneCanvas'

export default function TubePlanViewer() {
  const {params} = useMatch('/tools/tube-planner/:sceneId') || {params: {}};

  return <SceneCanvas sceneId={params.sceneId} />;
}
