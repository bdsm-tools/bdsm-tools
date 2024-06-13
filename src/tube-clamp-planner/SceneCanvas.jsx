import React from 'react';
import { Alert } from 'antd'
import { useLocalStorageState, useThrottleFn } from 'ahooks'
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
import GuiControls, { CanvasDataCapture } from './controls/GuiControls'
import { Object3D } from 'three'
import testScene from './data/testScene'
import useChainStore from './state/useChainStore'

extend({ OrbitControls })

function Loader () {
  const { progress } = useProgress()
  return <Html center>{Math.floor(progress)} % loaded</Html>
}

export default function SceneCanvas({ sceneId }) {
  const [scene, setSceneNow] = useLocalStorageState(`tube-plan-${sceneId}`, {
    defaultValue: {
      chains: [],
      width: 100,
      length: 100,
      height: 100,
      brightness: 1,
    },
  });
  const [canvasData, setData] = React.useState({});

  const { run: setScene } = useThrottleFn(setSceneNow, { wait: 50 });

  const { chains, getNode, setChainNode, addChainNode, importChains } = useChainStore()
  React.useEffect(() => {
    if (scene) {
      importChains(...scene.chains);
    }
  }, [scene]);

  React.useEffect(() => {
    if (sceneId === '__dev__') {
      setSceneNow(testScene);
    }
  }, [sceneId]);

  const getSelectable = (s) => !s || !(s instanceof Object3D) ? undefined : (s?.userData?.selectable ? s : getSelectable(s.parent))

  if (!WebGL.isWebGLAvailable()) return <Alert>The browser you are using in unable to display this content</Alert>
  return (
    <div style={{ display: 'flex', height: '100%', marginLeft: -50, marginRight: -50 }}>
      <RetryErrorBoundary message="Error when rendering the canvas. Please refresh and try again">
        <Canvas id='tube-planner-canvas' gl={{ preserveDrawingBuffer: true }}>
          <React.Suspense fallback={<Loader/>}>
            <Select filter={(s) => s.map(getSelectable).filter((s) => !!s)}>
              <ambientLight intensity={scene.brightness}/>
              <pointLight position={[scene.width / 2, scene.height - 20, scene.length / 2]} power={1000000 * scene.brightness} castShadow={true} />

              <Selection enabled>
                <Base length={scene.length} width={scene.width} height={scene.height} />
                {chains.map(((chain, index) => (
                  <Chain key={index} chain={chain} scene={scene}/>
                )))}

                <EffectComposer autoClear={false} multisampling={16}>
                  <HighlightSelected selection={canvasData.selection}/>

                  <SSAO/>
                  <SMAA/>
                </EffectComposer>
              </Selection>


              <Controls/>
              <CameraControls/>

              <CanvasDataCapture setData={setData}/>
            </Select>
          </React.Suspense>
        </Canvas>
      </RetryErrorBoundary>
      <GuiControls
        canvasData={canvasData}
        scene={scene}
        setScene={setScene}
        chains={chains}
        getNode={getNode}
        setChainNode={setChainNode}
        addChainNode={addChainNode}
      />
    </div>
  )
}