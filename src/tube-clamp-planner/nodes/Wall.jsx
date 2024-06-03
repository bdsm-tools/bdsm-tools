import React from "react";
import {useTexture} from "@react-three/drei";
import wallMap from "../textures/Wall_BrickPainted_1K_albedo.png";
import wallHeight from "../textures/Wall_BrickPainted_1K_height.png";
import wallNormalMap from "../textures/Wall_BrickPainted_1K_normal.png";
import wallRoughness from "../textures/Wall_BrickPainted_1K_roughness.png";
import wallAo from "../textures/Wall_BrickPainted_1K_ao.png";
import {DoubleSide} from "three";
import useRotate from '../controls/useRotate'

export default function Wall({ length, width }) {
    const ref = React.useRef();
    const sideRef = React.useRef();
    const backRef = React.useRef();
    const backSideRef = React.useRef();

    const textureProps = useTexture({
        map: wallMap,
        displacementMap: wallHeight,
        normalMap: wallNormalMap,
        roughnessMap: wallRoughness,
        aoMap: wallAo,
    });

    useRotate(sideRef, { y: 90 });
    useRotate(backRef, { y: 180 });
    useRotate(backSideRef, { y: 270 });

    return (
        <>
            <mesh ref={ref} name='wall' position={[width / 2, 100, 0]}>
                <planeGeometry args={[width, 200]} />
                <meshStandardMaterial {...textureProps} />
            </mesh>
            <mesh ref={sideRef} name='wall' position={[0, 100, length / 2]}>
                <planeGeometry args={[length, 200]} />
                <meshStandardMaterial {...textureProps}/>
            </mesh>
            <mesh ref={backRef} name='wall' position={[width / 2, 100, length]}>
                <planeGeometry args={[width, 200]} />
                <meshStandardMaterial {...textureProps} />
            </mesh>
            <mesh ref={backSideRef} name='wall' position={[width, 100, length / 2]}>
                <planeGeometry args={[length, 200]} />
                <meshStandardMaterial {...textureProps}/>
            </mesh>
        </>
    );
}