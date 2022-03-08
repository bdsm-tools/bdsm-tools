import React from 'react';
import {Alert, Spin} from 'antd';
import {Canvas, extend, useFrame, useThree} from '@react-three/fiber'
import WebGL from 'three/examples/jsm/capabilities/WebGL.js';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {Html, useProgress} from "@react-three/drei";

import Controls from "./components/Controls";
import useFocusNode from "./controls/useFocusNode";
import Floor from "./nodes/Floor";
import Wall from "./nodes/Wall";
import Base from "./components/Base";
import CameraControls from "./components/CameraControls";
import Tube from "./nodes/Tube";
import {B} from "./sizes";

extend({OrbitControls});

function Box(props) {
    // This reference gives us direct access to the THREE.Mesh object
    const ref = React.useRef();
    // Hold state for hovered and clicked events
    const [hovered, hover] = React.useState(false);
    const [clicked, click] = React.useState(false);
    // Subscribe this component to the render-loop, rotate the mesh every frame
    useFrame((state, delta) => (ref.current.rotation.x += 0.01))
    // Return the view, these are regular Threejs elements expressed in JSX

    const focusNode = useFocusNode();
    return (
        <mesh
            {...props}
            ref={ref}
            scale={clicked ? 1.5 : 1}
            onClick={focusNode}
            onPointerOver={(event) => hover(true)}
            onPointerOut={(event) => hover(false)}>
            <boxGeometry args={[10, 10, 10]}/>
            <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'}/>
        </mesh>
    )
}

function Loader() {
    const { active, progress, errors, item, loaded, total } = useProgress()
    return <Html center>{progress} % loaded</Html>
}

export default function Entry() {

    if (WebGL.isWebGLAvailable()) {
        return (
            <Canvas>
                <React.Suspense fallback={<Loader />}>
                    <>
                        <ambientLight intensity={0.5}/>
                        {/*<spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />*/}
                        <pointLight position={[-10, -10, -10]}/>
                        <Base length={202} width={152}/>
                        <Box position={[0, 0, 0]}/>
                        <Controls/>
                        <CameraControls/>
                        <Tube length={100} size={B} />
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