import React from "react";
import {useTexture} from "@react-three/drei";
import wallMap from "../textures/Wall_BrickPainted_1K_albedo.png";
import wallHeight from "../textures/Wall_BrickPainted_1K_height.png";
import wallNormalMap from "../textures/Wall_BrickPainted_1K_normal.png";
import wallRoughness from "../textures/Wall_BrickPainted_1K_roughness.png";
import wallAo from "../textures/Wall_BrickPainted_1K_ao.png";

export default function Wall({ length, width }) {
    const ref = React.useRef();
    const sideRef = React.useRef();

    const textureProps = useTexture({
        map: wallMap,
        displacementMap: wallHeight,
        normalMap: wallNormalMap,
        roughnessMap: wallRoughness,
        aoMap: wallAo,
    });

    return (
        <>
            <mesh ref={ref} position={[width / 2, 200, 0]}>
                <boxGeometry args={[width, 400, 0]} />
                <meshStandardMaterial {...textureProps} />
            </mesh>
            <mesh ref={sideRef} position={[0, 200, length / 2]}>
                <boxGeometry args={[0, 400, length]} />
                <meshStandardMaterial {...textureProps} />
            </mesh>
        </>
    );
}