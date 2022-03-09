import React from "react";
import {DoubleSide, RepeatWrapping} from "three";
import {useTexture} from "@react-three/drei";
import tubeMap from "../textures/Metal_Galvanized_1K_albedo.png";
import tubeNormalMap from "../textures/Metal_Galvanized_1K_normal.png";
import tubeRoughness from "../textures/Metal_Galvanized_1K_roughness.png";
import tubeMetalic from "../textures/Metal_Galvanized_1K_metallic.png";
import useFocusNode from "../controls/useFocusNode";

export default function Flange({ position, size, setEndConnectionPosition }) {

    const textureProps = useTexture({
        map: tubeMap,
        normalMap: tubeNormalMap,
        roughnessMap: tubeRoughness,
        metalnessMap: tubeMetalic,
    });

    const [x,y,z] = position;

    React.useEffect(() => setEndConnectionPosition(0, [x, y, z]), []);

    const baseRadius = size * 1.5;
    const baseHeight = 1;

    const neckRadius = (size + 1) / 2;
    const neckHeight = 5;
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