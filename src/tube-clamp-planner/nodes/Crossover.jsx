import React from "react";
import {DoubleSide, RepeatWrapping} from "three";
import {useTexture} from "@react-three/drei";
import tubeMap from "../textures/Metal_Galvanized_1K_albedo.png";
import tubeNormalMap from "../textures/Metal_Galvanized_1K_normal.png";
import tubeRoughness from "../textures/Metal_Galvanized_1K_roughness.png";
import tubeMetalic from "../textures/Metal_Galvanized_1K_metallic.png";
import useFocusNode from "../controls/useFocusNode";
import {useFrame} from "@react-three/fiber";
import useRotate from "../controls/useRotate";

export default function Crossover({ position, size, rotation, connection, setMiddleConnectionPosition }) {
    const calculatedRotation = {
        ...rotation,
        y: rotation.y + connection.rotation,
    };

    const groupRef = React.useRef();
    const startRef = React.useRef();
    const endRef = React.useRef();

    useRotate(groupRef, calculatedRotation);
    useRotate(endRef, { x: 90 });

    const textureProps = useTexture({
        map: tubeMap,
        normalMap: tubeNormalMap,
        roughnessMap: tubeRoughness,
        metalnessMap: tubeMetalic,
    });

    const tubeRadius = (size + 1) / 2;
    const tubeHeight = 4;

    const endPosition = [(tubeRadius * 2) - 0.5, 0, 0];

    React.useEffect(() => setMiddleConnectionPosition(0, endPosition), []);

    return (
        <group ref={groupRef} position={position}>
            <mesh ref={startRef}>
                <cylinderGeometry args={[tubeRadius, tubeRadius, tubeHeight, 64, 1]}/>
                <meshStandardMaterial {...textureProps}/>
            </mesh>
            <mesh ref={endRef} position={endPosition}>
                <cylinderGeometry args={[tubeRadius, tubeRadius, tubeHeight, 64, 1]}/>
                <meshStandardMaterial {...textureProps}/>
            </mesh>
        </group>
    );
}