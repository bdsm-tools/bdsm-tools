import React from 'react'
import { Alert } from 'antd'
import { useThrottleFn } from 'ahooks'
import { Object3D } from 'three'
import { Canvas, extend } from '@react-three/fiber'
import WebGL from 'three/examples/jsm/capabilities/WebGL.js'
import { Html, useProgress, OrbitControls, Select } from '@react-three/drei'
import {
  EffectComposer,
  Selection,
  SMAA,
  SSAO
} from '@react-three/postprocessing'
import Controls from './components/Controls'
import Base from './components/Base'
import CameraControls from './components/CameraControls'
import validateChain from './validation/validateChain'
import './connectors/flange'
import './connectors/crossover'
import './connectors/tee'
import Chain from './components/Chain'
import { exportChain, importChain } from './data/chain'
import GuiControls, { CanvasDataCapture } from './controls/GuiControls'
import useChainStore from './state/useChainStore'
import HighlightSelected from './controls/HighlightSelected'
import RetryErrorBoundary from './components/RetryErrorBoundary'

extend({ OrbitControls })

function Loader () {
  const { progress } = useProgress()
  return <Html center>{Math.floor(progress)} % loaded</Html>
}

const exampleChain = {
  type: 'flange',
  endConnections: [{
    type: 'tube',
    num: 1,
    length: 30,
    middleConnections: [{
      type: 'crossover',
      position: 20,
      rotation: 45,
      // middleConnections: [{
      //     type: 'tube',
      //     num: 2,
      //     position: 20,
      //     length: 50,
      //     endConnections: [{
      //         type: 'flange'
      //     }, {
      //         type: 'flange'
      //     }]
      // }],
    }],
    endConnections: [{
      type: 'tee'
    }],
  }]
}

const example = {
  length: 202,
  width: 152,
  brightness: .75,
  chains: [
    {
      ...exampleChain,
      surfaceConnections: [{
        surface: 'floor',
        coords: [100, 50]
      }],
    }, {
      ...exampleChain,
      surfaceConnections: [{
        surface: 'side-wall',
        coords: [100, 50]
      }],
    }, {
      ...exampleChain,
      surfaceConnections: [{
        surface: 'back-wall',
        coords: [100, 50]
      }],
    }
  ]
}

const ControlsEnum = {
  forward: 'forward',
  back: 'back',
  left: 'left',
  right: 'right',
  jump: 'jump',
}

const getSelectable = (s) => !s || !(s instanceof Object3D) ? undefined : (s?.userData?.selectable ? s : getSelectable(s.parent))

export default function Entry () {
  const [scene, setScene] = React.useState(example)
  const [canvasData, setData] = React.useState({})

  const { chains, getNode, setChainNode, addChainNode, importChains } = useChainStore()
  React.useEffect(() => {
    importChains(...example.chains)
  }, [])

  // const { run: setChainNodeThrottled } = useThrottleFn((id, node) => {
  //     setChains((old) => old.map(chain => {
  //         if (chain[id]) {
  //             return ({
  //                 ...chain,
  //                 [id]: {
  //                     ...chain[id],
  //                     node: {
  //                         ...chain[id].node,
  //                         ...node,
  //                     },
  //                 },
  //             });
  //         }
  //         return chain;
  //     }))
  // }, { wait: 50 });

  // const getNode = (id) => chains.find(chain => chain[id])[id];
  // const setChainNode = (id) => (node) => setChainNodeThrottled(id, node);
  // const addChainNode = (node) => setChains((old) => old.map(chain => {
  //     if (chain[node.parent]) {
  //         return ({
  //             ...chain,
  //             [node.id]: node,
  //             [node.parent]: {
  //                 ...chain[node.parent],
  //                 children: {
  //                     ...chain[node.parent].children,
  //                     [node.parentSlot]: [
  //                         ...chain[node.parent].children[node.parentSlot],
  //                         node.id,
  //                     ],
  //                 },
  //             },
  //         });
  //     }
  //     return chain;
  // }));

  if (!WebGL.isWebGLAvailable()) return <Alert>The browser you are using in unable to display this content</Alert>
  return (
    <div style={{ display: 'flex', height: '100%', marginLeft: -50, marginRight: -50 }}>
      <RetryErrorBoundary message="Error when rendering the canvas. Please refresh and try again">
        <Canvas>
          <React.Suspense fallback={<Loader/>}>
            <Select filter={(s) => s.map(getSelectable).filter((s) => !!s)}>
              <ambientLight intensity={scene.brightness}/>
              {/*<spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />*/}
              <pointLight position={[-10, -10, -10]}/>

              <Selection enabled>
                <Base length={scene.length} width={scene.width}/>
                {chains.map(((chain, index) => (
                  <Chain key={index} chain={chain}/>
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