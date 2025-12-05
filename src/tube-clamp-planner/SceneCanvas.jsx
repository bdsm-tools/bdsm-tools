import React from 'react';
import { Alert, Button, Empty } from 'antd';
import WebGL from 'three/examples/jsm/capabilities/WebGL';
import { Canvas, extend } from '@react-three/fiber';
import { Html, OrbitControls, Preload, useProgress } from '@react-three/drei';
import {
  EffectComposer,
  N8AO,
  Selection,
  SMAA,
} from '@react-three/postprocessing';
import { useMatch, useNavigate } from 'react-router-dom';
import RetryErrorBoundary from './components/RetryErrorBoundary';
import Base from './components/Base';
import Chain from './components/Chain';
import HighlightSelected from './controls/HighlightSelected';
import Controls from './components/Controls';
import CameraControls from './components/CameraControls';
import GuiControls from './controls/GuiControls';
import useSceneStore from './state/useSceneStore';
import SelectionWrapper from './components/SelectionWrapper';
import { useWhyDidYouUpdate } from 'ahooks';
import SlaveModel from './components/SlaveModel';

extend({ OrbitControls });

function Loader() {
  const { progress } = useProgress();
  return <Html center>{Math.floor(progress)} % loaded</Html>;
}

export default function SceneCanvas() {
  const navigate = useNavigate();
  const { params } = useMatch('/tools/tube-planner/:sceneId') || { params: {} };
  const { scene, chains } = useSceneStore();

  if (!scene) {
    return (
      <Empty description={`Cannot find a plan with the id: ${params.sceneId}`}>
        <Button onClick={() => navigate('..')}>Back to safety</Button>
      </Empty>
    );
  }

  if (!WebGL.isWebGL2Available())
    return (
      <Alert>The browser you are using in unable to display this content</Alert>
    );
  return (
    <div
      style={{
        display: 'flex',
        height: '100%',
        marginLeft: -50,
        marginRight: -50,
      }}
    >
      <RetryErrorBoundary message='Error when rendering the canvas. Please refresh and try again'>
        <Canvas
          id='tube-planner-canvas'
          gl={{
            preserveDrawingBuffer: true,
            powerPreference: 'high-performance',
          }}
        >
          <React.Suspense fallback={<Loader />}>
            <SelectionWrapper>
              <ambientLight intensity={scene.brightness} />
              <pointLight
                position={[
                  scene.width * 0.25,
                  scene.height - 20,
                  scene.length * 0.25,
                ]}
                power={1000000 * scene.brightness}
                castShadow={true}
              />
              <pointLight
                position={[
                  scene.width * 0.75,
                  scene.height - 20,
                  scene.length * 0.75,
                ]}
                power={1000000 * scene.brightness}
                castShadow={true}
              />
              <pointLight
                position={[
                  scene.width * 0.25,
                  scene.height - 20,
                  scene.length * 0.75,
                ]}
                power={1000000 * scene.brightness}
                castShadow={true}
              />
              <pointLight
                position={[
                  scene.width * 0.75,
                  scene.height - 20,
                  scene.length * 0.25,
                ]}
                power={1000000 * scene.brightness}
                castShadow={true}
              />

              <Selection enabled>
                <Base
                  length={scene.length}
                  width={scene.width}
                  height={scene.height}
                />
                {chains.filter(Boolean).map((chain, index) => (
                  <Chain key={index} chain={chain} scene={scene} />
                ))}

                <EffectComposer autoClear={false} multisampling={16}>
                  <HighlightSelected />

                  {scene?.settings?.n8ao && <N8AO />}
                  {scene?.settings?.smaa && <SMAA />}
                </EffectComposer>
              </Selection>
              <Controls />
              <CameraControls />

              {scene.slaveModel?.enabled && (
                <SlaveModel
                  poseKey={scene.slaveModel?.pose}
                  position={scene.slaveModel?.position}
                />
              )}
            </SelectionWrapper>
            <Preload all />
          </React.Suspense>
        </Canvas>
      </RetryErrorBoundary>
      <GuiControls />
    </div>
  );
}
