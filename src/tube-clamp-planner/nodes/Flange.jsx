import React from "react";
import {useTexture} from "@react-three/drei";
import tubeMap from "../textures/Metal_Galvanized_1K_albedo.png";
import tubeNormalMap from "../textures/Metal_Galvanized_1K_normal.png";
import tubeRoughness from "../textures/Metal_Galvanized_1K_roughness.png";
import tubeMetalic from "../textures/Metal_Galvanized_1K_metallic.png";
import useRotate from '../controls/useRotate'
import { DoubleSide } from 'three'

export default function Flange({ id, size }) {
    const groupRef = React.useRef();
    const neckRingRef = React.useRef();
    const baseRingStartRef = React.useRef();
    const baseRingEndRef = React.useRef();

    const textureProps = useTexture({
        map: tubeMap,
        normalMap: tubeNormalMap,
        roughnessMap: tubeRoughness,
        metalnessMap: tubeMetalic,
    });

    useRotate(neckRingRef, { x: 90 });
    useRotate(baseRingStartRef, { x: 90 });
    useRotate(baseRingEndRef, { x: 90 });

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
            <mesh position={[0, baseHeight / 2, 0]}>
                <cylinderGeometry args={[baseRadius, baseRadius, baseHeight, 64, 1, true]}/>
                <meshStandardMaterial {...textureProps} side={DoubleSide}/>
            </mesh>
            <mesh ref={baseRingStartRef} position={[0, baseHeight, 0]}>
                <ringGeometry args={[baseRadius, neckRadius, 64]}/>
                <meshStandardMaterial {...textureProps} side={DoubleSide}/>
            </mesh>
            <mesh ref={baseRingEndRef} position={[0, 0, 0]}>
                <ringGeometry args={[baseRadius, neckRadius, 64]}/>
                <meshStandardMaterial {...textureProps} side={DoubleSide}/>
            </mesh>

            <mesh position={[0, (neckHeight / 2) + baseHeight, 0]}>
                <cylinderGeometry args={[neckRadius, neckRadius, neckHeight, 64, 1, true]}/>
                <meshStandardMaterial {...textureProps} side={DoubleSide}/>
            </mesh>
            <mesh position={[0, (neckHeight / 2) + baseHeight, 0]}>
                <cylinderGeometry args={[neckRadius - .2, neckRadius - .2, neckHeight, 64, 1, true]}/>
                <meshStandardMaterial {...textureProps} side={DoubleSide}/>
            </mesh>
            <mesh ref={neckRingRef} position={[0, neckHeight + baseHeight, 0]}>
                <ringGeometry args={[neckRadius, neckRadius - .2, 64]}/>
                <meshStandardMaterial {...textureProps} side={DoubleSide}/>
            </mesh>
        </group>
    );
}