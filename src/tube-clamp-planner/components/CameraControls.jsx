import React from "react";
import {useFrame, useThree} from "@react-three/fiber";

export default function CameraControls() {
    const { camera, gl: { domElement } } = useThree();
    const controls = React.useRef();
    useFrame((state) => controls.current.update());
    return <orbitControls ref={controls} args={[camera, domElement]} />;
};