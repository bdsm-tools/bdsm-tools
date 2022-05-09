import React from 'react';
import {Alert, Spin} from 'antd';
import {Canvas, extend, useFrame, useThree} from '@react-three/fiber'
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

const example = {
    length: 202,
    width: 152,
    chains: [
        {
            type: 'flange',
            surfaceConnections: [{
                surface: 'floor',
                coords: [100, 50]
            }],
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
                    }],
                }],
                // endConnection: {
                //     type: 'flange'
                // },
            }]
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
                        <Chain chain={example.chains[0]}/>
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