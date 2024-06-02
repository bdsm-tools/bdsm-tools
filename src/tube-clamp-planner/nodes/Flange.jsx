import React from "react";
import {useTexture} from "@react-three/drei";
import tubeMap from "../textures/Metal_Galvanized_1K_albedo.png";
import tubeNormalMap from "../textures/Metal_Galvanized_1K_normal.png";
import tubeRoughness from "../textures/Metal_Galvanized_1K_roughness.png";
import tubeMetalic from "../textures/Metal_Galvanized_1K_metallic.png";

export default function Flange({ id, size }) {
    const groupRef = React.useRef();

    const textureProps = useTexture({
        map: tubeMap,
        normalMap: tubeNormalMap,
        roughnessMap: tubeRoughness,
        metalnessMap: tubeMetalic,
    });

    const baseRadius = size * 1.5;
    const baseHeight = 1;

    const neckRadius = (size + 1) / 2;
    const neckHeight = 5;
    return (
        <group
          ref={groupRef}
          name='flange' layers={1}
          userData={{ id, selectable: true }}
        >
            <mesh position={0}>
                <cylinderGeometry args={[baseRadius, baseRadius, baseHeight, 64, 1]}/>
                <meshStandardMaterial {...textureProps}/>
            </mesh>
            <mesh position={[0, (neckHeight / 2), 0]}>
                <cylinderGeometry args={[neckRadius, neckRadius, neckHeight, 64, 1]}/>
                <meshStandardMaterial {...textureProps}/>
            </mesh>
        </group>
    );
}