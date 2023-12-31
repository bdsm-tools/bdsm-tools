import React from "react";
import {useTexture} from "@react-three/drei";
import tubeMap from "../textures/Metal_Galvanized_1K_albedo.png";
import tubeNormalMap from "../textures/Metal_Galvanized_1K_normal.png";
import tubeRoughness from "../textures/Metal_Galvanized_1K_roughness.png";
import tubeMetalic from "../textures/Metal_Galvanized_1K_metallic.png";
import useRotate from "../controls/useRotate";

export default function Tee({ size, connection, middleConnections, setMiddleConnectionPosition, setMiddleConnectionRotation }) {
    const [connectedTube] = middleConnections;

    const groupRef = React.useRef();
    const middleRef = React.useRef();
    const endRef = React.useRef();

    useRotate(endRef, { z: 90 });

    const textureProps = useTexture({
        map: tubeMap,
        normalMap: tubeNormalMap,
        roughnessMap: tubeRoughness,
        metalnessMap: tubeMetalic,
    });

    const tubeRadius = (size + 1) / 2;
    const tubeHeight = 4;

    const middlePosition = [0, (tubeRadius * 2) - 0.5, 0];

    // React.useEffect(() => setMiddleConnectionPosition(0, [
    //     endPosition[0],
    //     0,
    //     -connectedTube.node.position,
    // ]), []);
    // React.useEffect(() => setMiddleConnectionRotation(0, { x: 90 }), []);

    return (
        <group ref={groupRef} name='tee' position={[0, -(tubeRadius * 2), 0]} layers={1}>
            <mesh ref={middleRef} position={middlePosition}>
                <cylinderGeometry args={[tubeRadius, tubeRadius, tubeHeight, 64, 1]}/>
                <meshStandardMaterial {...textureProps}/>
                {/*<meshBasicMaterial color={0xff0000} />*/}
            </mesh>
            <mesh ref={endRef} position={[0, tubeRadius, 0]}>
                <cylinderGeometry args={[tubeRadius, tubeRadius, tubeRadius * 2, 64, 1]}/>
                <meshStandardMaterial {...textureProps}/>
                {/*<meshBasicMaterial color={0x00ff00} />*/}
            </mesh>
        </group>
    );
}