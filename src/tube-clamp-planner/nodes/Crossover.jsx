import React from "react";
import {DoubleSide, RepeatWrapping} from "three";
import {useTexture} from "@react-three/drei";
import tubeMap from "../textures/Metal_Galvanized_1K_albedo.png";
import tubeNormalMap from "../textures/Metal_Galvanized_1K_normal.png";
import tubeRoughness from "../textures/Metal_Galvanized_1K_roughness.png";
import tubeMetalic from "../textures/Metal_Galvanized_1K_metallic.png";
import useFocusNode from "../controls/useFocusNode";

export default function Crossover({ position, size }) {

    const textureProps = useTexture({
        map: tubeMap,
        normalMap: tubeNormalMap,
        roughnessMap: tubeRoughness,
        metalnessMap: tubeMetalic,
    });

    const [x,y,z] = position;

    return (
        <>
            <mesh position={[x, y, z]}>
                <cylinderGeometry args={[baseRadius, baseRadius, baseHeight, 64, 1]}/>
                <meshStandardMaterial {...textureProps}/>
            </mesh>
            <mesh position={[x, y + (neckHeight / 2), z]}>
                <cylinderGeometry args={[neckRadius, neckRadius, neckHeight, 64, 1]}/>
                <meshStandardMaterial {...textureProps}/>
            </mesh>
        </>
    );
}