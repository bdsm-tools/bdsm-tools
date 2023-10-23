import React from 'react';
import {Alert} from 'antd';
import {Canvas, extend} from '@react-three/fiber'
import WebGL from 'three/examples/jsm/capabilities/WebGL.js';
import { Html, useProgress, OrbitControls, Select } from '@react-three/drei'
import Controls from "./components/Controls";
import Base from "./components/Base";
import CameraControls from "./components/CameraControls";
import validateChain from "./validation/validateChain";
import './connectors/flange';
import './connectors/crossover';
import './connectors/tee';
import Chain from "./components/Chain";
import { Object3D } from 'three'

extend({ OrbitControls });

function Loader() {
    const {progress} = useProgress();
    return <Html center>{Math.floor(progress)} % loaded</Html>
}

const exampleChain = {
    type: 'flange',
    endConnections: [{
        type: 'tube',
        length: 30,
        middleConnections: [{
            type: 'crossover',
            position: 20,
            rotation: 45,
            middleConnections: [{
                type: 'tube',
                position: 20,
                length: 50,
                startConnection: {
                    type: 'flange'
                },
                endConnection: {
                    type: 'flange'
                }
            }],
        }],
        endConnection: {
            type: 'tee'
        },
    }]
}

const example = {
    length: 202,
    width: 152,
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
};

const ControlsEnum = {
    forward: 'forward',
      back:'back',
      left: 'left',
      right: 'right',
      jump: 'jump',
}

const getSelectable = (s) => !s || !(s instanceof Object3D) ? undefined : (!!s?.userData?.selectable ? s : getSelectable(s.parent));

export default function Entry() {

    validateChain(example.chains);

    if (WebGL.isWebGLAvailable()) {
        return (
            <Canvas>
                <React.Suspense fallback={<Loader/>}>
                    <Select filter={(s) => s.map(getSelectable).filter((s) => !!s)}>
                        <ambientLight intensity={0.5}/>
                        {/*<spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />*/}
                        <pointLight position={[-10, -10, -10]}/>

                        <Base length={example.length} width={example.width}/>
                        {example.chains.map(((chain, index) => (
                          <Chain key={index} chain={chain}/>
                        )))}

                        <Controls/>
                        <CameraControls/>
                    </Select>
                </React.Suspense>
            </Canvas>
        );
    }
    return (
        <Alert>
            The browser you are using in unable to display this content
        </Alert>
    );
}