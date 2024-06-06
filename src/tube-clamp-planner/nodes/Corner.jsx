import React from "react";
import { DoubleSide, Euler, MathUtils } from 'three'
import { Addition, Base, Geometry, Subtraction } from '@react-three/csg'
import {useTexture} from "@react-three/drei";
import tubeMap from "../textures/Metal_Galvanized_1K_albedo.png";
import tubeNormalMap from "../textures/Metal_Galvanized_1K_normal.png";
import tubeRoughness from "../textures/Metal_Galvanized_1K_roughness.png";
import tubeMetalic from "../textures/Metal_Galvanized_1K_metallic.png";
import useRotate from "../controls/useRotate";

export default function Corner({ id, size, connection, parentConnection, setEndConnectionPosition, setEndConnectionRotation }) {
    const ref = React.useRef();
    const endRef = React.useRef();
    const endInnerRef = React.useRef();
    const endRingEndRef = React.useRef();
    const startRef = React.useRef();
    const startInnerRef = React.useRef();
    const startRingEndRef = React.useRef();
    const middleRef = React.useRef();

    useRotate(endRef, { x: 90 });
    useRotate(endInnerRef, { x: 90 });
    useRotate(startRingEndRef, { x: 90 });

    const textureProps = useTexture({
        map: tubeMap,
        normalMap: tubeNormalMap,
        roughnessMap: tubeRoughness,
        metalnessMap: tubeMetalic,
    });

    const tubeRadius = (size / 2) + .25;
    const tubeHeight = 4;

    React.useEffect(() => setEndConnectionPosition(0, [
        0,
        -(tubeHeight / 2),
        (tubeHeight / 2),
    ]), []);
    React.useEffect(() => setEndConnectionRotation(0, { x: 90 }), []);

    return (
        <group
          ref={ref}
          name='corner'
          layers={1}
          userData={{ id, selectable: true }}
          position={[0, -(tubeHeight / 2), 0]}
        >
            {/*<mesh ref={middleRef} position={[0, 0, 0]}>*/}
            {/*    <meshStandardMaterial {...textureProps} side={DoubleSide}/>*/}
            {/*    <Geometry>*/}
            {/*        <Base>*/}
            {/*            <cylinderGeometry args={[tubeRadius, tubeRadius, tubeHeight, 64, 1, true]}/>*/}
            {/*        </Base>*/}
            {/*        <Subtraction position={[0, -tubeRadius, 0]} rotation={new Euler(MathUtils.degToRad(90), 0, 0)}>*/}
            {/*            <cylinderGeometry args={[tubeRadius - .2, tubeRadius - .2, tubeRadius * 2, 64, 1]}/>*/}
            {/*        </Subtraction>*/}
            {/*    </Geometry>*/}
            {/*</mesh>*/}
            {/*<mesh ref={middleInnerRef} position={[0, 0, 0]}>*/}
            {/*    <meshStandardMaterial {...textureProps} side={DoubleSide}/>*/}
            {/*    <Geometry>*/}
            {/*        <Base>*/}
            {/*            <cylinderGeometry args={[tubeRadius - .2, tubeRadius - .2, tubeHeight, 64, 1, true]}/>*/}
            {/*        </Base>*/}
            {/*        <Subtraction position={[0, -tubeRadius, 0]} rotation={new Euler(MathUtils.degToRad(90), 0, 0)}>*/}
            {/*            <cylinderGeometry args={[tubeRadius - .2, tubeRadius - .2, tubeRadius * 2, 64, 1]}/>*/}
            {/*        </Subtraction>*/}
            {/*    </Geometry>*/}
            {/*</mesh>*/}
            {/*<mesh ref={middleRingEndRef} position={[0, tubeHeight / 2, 0]}>*/}
            {/*    <ringGeometry args={[tubeRadius, tubeRadius - .2, 64]}/>*/}
            {/*    <meshStandardMaterial {...textureProps} side={DoubleSide}/>*/}
            {/*</mesh>*/}

            <mesh ref={middleRef} position={[0, 0, 0]}>
                <sphereGeometry args={[tubeRadius, 64, 64]}/>
                <meshStandardMaterial {...textureProps} side={DoubleSide}/>
            </mesh>

            <mesh ref={startRef} position={[0, tubeRadius, 0]}>
                <cylinderGeometry args={[tubeRadius, tubeRadius, tubeRadius * 2, 64, 1, true]}/>
                <meshStandardMaterial {...textureProps} side={DoubleSide}/>
            </mesh>
            <mesh ref={startInnerRef} position={[0, tubeRadius, 0]}>
                <cylinderGeometry args={[tubeRadius - .2, tubeRadius - .2, tubeRadius * 2, 64, 1, true]}/>
                <meshStandardMaterial {...textureProps} side={DoubleSide}/>
            </mesh>
            <mesh ref={startRingEndRef} position={[0, tubeRadius * 2, 0]}>
                <ringGeometry args={[tubeRadius, tubeRadius - .2, 64]}/>
                <meshStandardMaterial {...textureProps} side={DoubleSide}/>
            </mesh>

            <mesh ref={endRef} position={[0, 0, tubeRadius]}>
                <cylinderGeometry args={[tubeRadius, tubeRadius, tubeRadius * 2, 64, 1, true]}/>
                <meshStandardMaterial {...textureProps} side={DoubleSide}/>
            </mesh>
            <mesh ref={endInnerRef} position={[0, 0, tubeRadius]}>
                <cylinderGeometry args={[tubeRadius - .2, tubeRadius - .2, tubeRadius * 2, 64, 1, true]}/>
                <meshStandardMaterial {...textureProps} side={DoubleSide}/>
            </mesh>
            <mesh ref={endRingEndRef} position={[0, 0, tubeRadius * 2]}>
                <ringGeometry args={[tubeRadius, tubeRadius - .2, 64]}/>
                <meshStandardMaterial {...textureProps} side={DoubleSide}/>
            </mesh>
        </group>
    );
}