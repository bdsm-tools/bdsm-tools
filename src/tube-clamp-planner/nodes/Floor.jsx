import React from "react";
import { useTexture } from "@react-three/drei";
import floorMap from '../textures/Wood_FloorOak_1K_albedo.png';
import floorHeight from '../textures/Wood_FloorOak_1K_height.png';
import floorNormalMap from '../textures/Wood_FloorOak_1K_normal.png';
import floorRoughness from '../textures/Wood_FloorOak_1K_roughness.png';
import useRotate from '../controls/useRotate'

export default function Floor({ length, width }) {
    const ref = React.useRef();
    const textureProps = useTexture({
        map: floorMap,
        displacementMap: floorHeight,
        normalMap: floorNormalMap,
        roughnessMap: floorRoughness,
    });

    useRotate(ref, { x: 270 });

    return (
        <mesh ref={ref} name='floor' position={[width / 2, 0, length / 2]} receiveShadow={true}>
            <planeGeometry args={[width, length]} />
            <meshStandardMaterial {...textureProps} />
        </mesh>
    );
}