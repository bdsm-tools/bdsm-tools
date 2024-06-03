import React from "react";
import { DoubleSide, Euler, MathUtils } from 'three'
import { Addition, Base, Geometry, Subtraction } from '@react-three/csg'
import {useTexture} from "@react-three/drei";
import tubeMap from "../textures/Metal_Galvanized_1K_albedo.png";
import tubeNormalMap from "../textures/Metal_Galvanized_1K_normal.png";
import tubeRoughness from "../textures/Metal_Galvanized_1K_roughness.png";
import tubeMetalic from "../textures/Metal_Galvanized_1K_metallic.png";
import useRotate from "../controls/useRotate";

export default function Tee({ id, size, connection, middleConnections, setMiddleConnectionPosition, setMiddleConnectionRotation }) {
    const [connectedTube] = middleConnections;

    const ref = React.useRef();
    const middleRef = React.useRef();
    const endRef = React.useRef();
    const endInnerRef = React.useRef();
    const endRingStartRef = React.useRef();
    const endRingEndRef = React.useRef();
    const middleRingEndRef = React.useRef();

    useRotate(endRef, { x: 90 });
    useRotate(endInnerRef, { x: 90 });
    useRotate(endRingStartRef, { y: 180 });
    useRotate(middleRingEndRef, { x: 90 });

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
        <group
          ref={ref}
          name='tee'
          layers={1}
          userData={{ id, selectable: true }}
          // position={[0, -(tubeRadius * 2), 0]}
        >
            <mesh position={[0, 0, 0]}>
                <meshStandardMaterial {...textureProps} side={DoubleSide}/>
                <Geometry>
                    <Base>
                        <cylinderGeometry args={[tubeRadius, tubeRadius, tubeHeight, 64, 1, true]}/>
                    </Base>
                    <Subtraction position={[0, -tubeRadius, 0]} rotation={new Euler(MathUtils.degToRad(90), 0, 0)}>
                        <cylinderGeometry args={[tubeRadius, tubeRadius, tubeRadius * 2, 64, 1]}/>
                    </Subtraction>
                </Geometry>
            </mesh>
            <mesh position={[0, 0, 0]}>
                <meshStandardMaterial {...textureProps} side={DoubleSide}/>
                <Geometry>
                    <Base>
                        <cylinderGeometry args={[tubeRadius - .2, tubeRadius - .2, tubeHeight, 64, 1, true]}/>
                    </Base>
                    <Subtraction position={[0, -tubeRadius, 0]} rotation={new Euler(MathUtils.degToRad(90), 0, 0)}>
                        <cylinderGeometry args={[tubeRadius, tubeRadius, tubeRadius * 2, 64, 1]}/>
                    </Subtraction>
                </Geometry>
            </mesh>
            <mesh ref={middleRingEndRef} position={[0, tubeHeight / 2, 0]}>
                <ringGeometry args={[tubeRadius, tubeRadius - .2, 64]}/>
                <meshStandardMaterial {...textureProps} side={DoubleSide}/>
            </mesh>

            <mesh ref={endRef} position={[0, -tubeRadius, 0]}>
                <cylinderGeometry args={[tubeRadius, tubeRadius, tubeRadius * 2, 64, 1, true]}/>
                <meshStandardMaterial {...textureProps} side={DoubleSide}/>
            </mesh>
            <mesh ref={endInnerRef} position={[0, -tubeRadius, 0]}>
                <cylinderGeometry args={[tubeRadius - .2, tubeRadius - .2, tubeRadius * 2, 64, 1, true]}/>
                <meshStandardMaterial {...textureProps} side={DoubleSide}/>
            </mesh>
            <mesh ref={endRingStartRef} position={[0, -tubeRadius, tubeRadius]}>
                <ringGeometry args={[tubeRadius, tubeRadius - .2, 64]}/>
                <meshStandardMaterial {...textureProps} side={DoubleSide}/>
            </mesh>
            <mesh ref={endRingEndRef} position={[0, -tubeRadius, -tubeRadius]}>
                <ringGeometry args={[tubeRadius, tubeRadius - .2, 64]}/>
                <meshStandardMaterial {...textureProps} side={DoubleSide}/>
            </mesh>
        </group>
    );
}