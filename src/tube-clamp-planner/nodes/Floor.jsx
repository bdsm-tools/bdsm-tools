import React from "react";
import { useTexture } from "@react-three/drei";
import floorMap from '../textures/Wood_FloorOak_1K_albedo.png';
import floorHeight from '../textures/Wood_FloorOak_1K_height.png';
import floorNormalMap from '../textures/Wood_FloorOak_1K_normal.png';
import floorRoughness from '../textures/Wood_FloorOak_1K_roughness.png';

export default function Floor({ length, width }) {
    const ref = React.useRef();
    const textureProps = useTexture({
        map: floorMap,
        displacementMap: floorHeight,
        normalMap: floorNormalMap,
        roughnessMap: floorRoughness,
    });

    const thickness = 2;

    return (
        <mesh ref={ref} name='floor' position={[width / 2, -thickness, length / 2]}>
            <boxGeometry args={[width, thickness, length]} />
            <meshStandardMaterial
                color='white'
                {...textureProps}
            />
        </mesh>
    );
}