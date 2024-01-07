import React from "react";
import {useTexture} from "@react-three/drei";
import tubeMap from "../textures/Metal_Galvanized_1K_albedo.png";
import tubeNormalMap from "../textures/Metal_Galvanized_1K_normal.png";
import tubeRoughness from "../textures/Metal_Galvanized_1K_roughness.png";
import tubeMetalic from "../textures/Metal_Galvanized_1K_metallic.png";
import useRotate from "../controls/useRotate";

export default function Crossover({ id, size, connection, middleConnections, setMiddleConnectionPosition, setMiddleConnectionRotation }) {
    const [connectedTube] = middleConnections;

    const groupRef = React.useRef();
    const startRef = React.useRef();
    const endRef = React.useRef();

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

    React.useEffect(() => setMiddleConnectionPosition(0, [
        endPosition[0],
        0,
        -connectedTube?.node.position,
    ]), [connectedTube?.node.position]);
    React.useEffect(() => setMiddleConnectionRotation(0, { x: 90 }), []);

    return (
        <group
          ref={groupRef}
          name='crossover' layers={1}
          userData={{ id, selectable: true }}
        >
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