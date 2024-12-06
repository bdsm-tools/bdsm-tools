import React from 'react';
import { useMatch } from 'react-router-dom';
import SceneCanvas from './SceneCanvas';
import { useInitScene } from './state/useSceneStore';
import ReactGA from 'react-ga4';

const InitStore = () => {
  const { params } = useMatch('/tools/tube-planner/:sceneId') || { params: {} };
  useInitScene(params.sceneId);

  React.useEffect(() => {
    ReactGA.event('view_tube_plan');
  }, []);

  // Store is initialised here to avoid the localstorage causing a rerender on update (which would lag the canvas)
  return null;
};

export default function TubePlanViewer() {
  return (
    <>
      <InitStore />
      <SceneCanvas />
    </>
  );
}
