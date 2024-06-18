import React from 'react';
import { Alert, Button, Empty } from 'antd'
import WebGL from 'three/examples/jsm/capabilities/WebGL'
import { Canvas, extend } from '@react-three/fiber'
import { Html, OrbitControls, Select, useProgress } from '@react-three/drei'
import { EffectComposer, Selection, SMAA, SSAO } from '@react-three/postprocessing'
import RetryErrorBoundary from './components/RetryErrorBoundary'
import Base from './components/Base'
import Chain from './components/Chain'
import HighlightSelected from './controls/HighlightSelected'
import Controls from './components/Controls'
import CameraControls from './components/CameraControls'
import GuiControls, { CaptureSelection } from './controls/GuiControls'
import { Object3D } from 'three'
import useSceneStore, { useInitScene } from './state/useSceneStore'
import { useNavigate } from 'react-router'
import { useMatch } from 'react-router-dom'

extend({ OrbitControls })

function Loader () {
  const { progress } = useProgress()
  return <Html center>{Math.floor(progress)} % loaded</Html>
}

export default function SceneCanvas() {
  const navigate = useNavigate();
  const { params } = useMatch('/tools/tube-planner/:sceneId') || { params: {} };
  const [canvasData, setData] = React.useState({});

  const { scene, chains } = useSceneStore();

  if (!scene) {
    return (
      <Empty
        description={`Cannot find a plan with the id: ${params.sceneId}`}
      >
        <Button onClick={() => navigate('..')}>
          Back to safety
        </Button>
      </Empty>
    );
  }

  const getSelectable = (s) => !s || !(s instanceof Object3D) ? undefined : (s?.userData?.selectable ? s : getSelectable(s.parent));

  if (!WebGL.isWebGLAvailable()) return <Alert>The browser you are using in unable to display this content</Alert>
  return (
    <div style={{ display: 'flex', height: '100%', marginLeft: -50, marginRight: -50 }}>
      <RetryErrorBoundary message="Error when rendering the canvas. Please refresh and try again">
        <Canvas id='tube-planner-canvas' gl={{ preserveDrawingBuffer: true }}>
          <React.Suspense fallback={<Loader/>}>
            <Select onChangePointerUp={(e) => console.log(e)} filter={(s) => s.map(getSelectable).filter((s) => !!s)}>
              <ambientLight intensity={scene.brightness}/>
              <pointLight position={[scene.width / 2, scene.height - 20, scene.length / 2]} power={1000000 * scene.brightness} castShadow={true} />

              <Selection enabled>
                <Base length={scene.length} width={scene.width} height={scene.height} />
                {chains.map(((chain, index) => (
                  <Chain key={index} chain={chain} scene={scene}/>
                )))}

                <EffectComposer autoClear={false} multisampling={16}>
                  <HighlightSelected />

                  <SSAO/>
                  <SMAA/>
                </EffectComposer>
              </Selection>


              <Controls/>
              <CameraControls />

              <CaptureSelection />
            </Select>
          </React.Suspense>
        </Canvas>
      </RetryErrorBoundary>
      <GuiControls />
    </div>
  )
}