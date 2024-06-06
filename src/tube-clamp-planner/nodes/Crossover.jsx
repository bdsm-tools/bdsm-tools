import React from "react";
import {useTexture} from "@react-three/drei";
import tubeMap from "../textures/Metal_Galvanized_1K_albedo.png";
import tubeNormalMap from "../textures/Metal_Galvanized_1K_normal.png";
import tubeRoughness from "../textures/Metal_Galvanized_1K_roughness.png";
import tubeMetalic from "../textures/Metal_Galvanized_1K_metallic.png";
import useRotate from "../controls/useRotate";
import { DoubleSide } from 'three'

export default function Crossover({ id, size, middleConnections, setMiddleConnectionPosition, setMiddleConnectionRotation }) {
    const [connectedTube] = middleConnections;

    const ref = React.useRef();
    const secondSideRef = React.useRef();
    const secondSideInnerRef = React.useRef();
    const firstSideStartRingRef = React.useRef();
    const firstSideEndRingRef = React.useRef();
    const secondSideStartRingRef = React.useRef();
    const secondSideEndRingRef = React.useRef();

    useRotate(firstSideStartRingRef, { x: 90, y: 180 });
    useRotate(firstSideEndRingRef, { x: 90 });
    useRotate(secondSideRef, { x: 90 });
    useRotate(secondSideInnerRef, { x: 90 });
    useRotate(secondSideEndRingRef, { y: 180 });

    const textureProps = useTexture({
        map: tubeMap,
        normalMap: tubeNormalMap,
        roughnessMap: tubeRoughness,
        metalnessMap: tubeMetalic,
    });

    const tubeRadius = (size / 2) + .25;
    const tubeHeight = 4;

    const endPosition = [(tubeRadius * 2) - 0.5, 0, 0];
    const endRingPosition = [(tubeRadius * 2) - 0.5, 0, -(tubeHeight / 2)];
    const endRingPositionEnd = [(tubeRadius * 2) - 0.5, 0, tubeHeight / 2];

    React.useEffect(() => setMiddleConnectionPosition(0, [
        endPosition[0],
        0,
        -connectedTube?.node?.position || 0,
    ]), [connectedTube?.node?.position]);
    React.useEffect(() => setMiddleConnectionRotation(0, { x: 90 }), []);

    return (
        <group
          ref={ref}
          layers={1}
          name='crossover'
          userData={{ id, selectable: true }}
        >
            <mesh position={[0, 0, 0]}>
                <cylinderGeometry args={[tubeRadius, tubeRadius, tubeHeight, 64, 1, true]}/>
                <meshStandardMaterial {...textureProps} side={DoubleSide}/>
            </mesh>
            <mesh position={[0, 0, 0]}>
                <cylinderGeometry args={[tubeRadius - .2, tubeRadius - .2, tubeHeight, 64, 1, true]}/>
                <meshStandardMaterial {...textureProps} side={DoubleSide}/>
            </mesh>

            <mesh ref={firstSideStartRingRef} position={[0, -(tubeHeight / 2), 0]}>
                <ringGeometry args={[tubeRadius, tubeRadius - .2, 64]}/>
                <meshStandardMaterial {...textureProps} side={DoubleSide}/>
            </mesh>
            <mesh ref={firstSideEndRingRef} position={[0, tubeHeight / 2, 0]}>
                <ringGeometry args={[tubeRadius, tubeRadius - .2, 64]}/>
                <meshStandardMaterial {...textureProps} side={DoubleSide}/>
            </mesh>

            <mesh ref={secondSideRef} position={endPosition}>
                <cylinderGeometry args={[tubeRadius, tubeRadius, tubeHeight, 64, 1, true]}/>
                <meshStandardMaterial {...textureProps} side={DoubleSide}/>
            </mesh>
            <mesh ref={secondSideInnerRef} position={endPosition}>
                <cylinderGeometry args={[tubeRadius - .2, tubeRadius - .2, tubeHeight, 64, 1, true]}/>
                <meshStandardMaterial {...textureProps} side={DoubleSide}/>
            </mesh>

            <mesh ref={secondSideStartRingRef} position={endRingPosition}>
                <ringGeometry args={[tubeRadius, tubeRadius - .2, 64]}/>
                <meshStandardMaterial {...textureProps} side={DoubleSide}/>
            </mesh>
            <mesh ref={secondSideEndRingRef} position={endRingPositionEnd}>
                <ringGeometry args={[tubeRadius, tubeRadius - .2, 64]}/>
                <meshStandardMaterial {...textureProps} side={DoubleSide}/>
            </mesh>
        </group>
    );
}