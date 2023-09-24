import React from 'react';
import {Alert} from 'antd';
import {Canvas, extend} from '@react-three/fiber'
import WebGL from 'three/examples/jsm/capabilities/WebGL.js';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {Html, useProgress} from "@react-three/drei";
import Controls from "./components/Controls";
import Base from "./components/Base";
import CameraControls from "./components/CameraControls";
import validateChain from "./validation/validateChain";
import './connectors/flange';
import './connectors/crossover';
import Chain from "./components/Chain";

extend({OrbitControls});

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
            type: 'flange'
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

export default function Entry() {

    validateChain(example.chains);

    if (WebGL.isWebGLAvailable()) {
        return (
            <Canvas>
                <React.Suspense fallback={<Loader/>}>
                    <>
                        <ambientLight intensity={0.5}/>
                        {/*<spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />*/}
                        <pointLight position={[-10, -10, -10]}/>
                        <Base length={example.length} width={example.width}/>
                        <Controls/>
                        <CameraControls/>
                        {example.chains.map(((chain, index) => (
                          <Chain key={index} chain={chain}/>
                        )))}
                    </>
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