import React from "react";
import { DoubleSide } from 'three'
import { useTexture } from '@react-three/drei'
import tubeMap from "../textures/Metal_Galvanized_1K_albedo.png";
import tubeNormalMap from "../textures/Metal_Galvanized_1K_normal.png";
import tubeRoughness from "../textures/Metal_Galvanized_1K_roughness.png";
import tubeMetalic from "../textures/Metal_Galvanized_1K_metallic.png";
import useSelectionStore from '../state/useSelectionStore'
import { Select } from '@react-three/postprocessing'
import useRotate from '../controls/useRotate'

export default function Tube({ id, length, size }) {
    const ref = React.useRef();
    const startRingRef = React.useRef();
    const endRingRef = React.useRef();

    const selectedNodeId = useSelectionStore((state) => state.selectedNodeId);
    const isSelected = id === selectedNodeId;

    const textureProps = useTexture({
        map: tubeMap,
        normalMap: tubeNormalMap,
        roughnessMap: tubeRoughness,
        metalnessMap: tubeMetalic,
    });

    useRotate(startRingRef, { x: 90, y: 180 });
    useRotate(endRingRef, { x: 90 });

    const tubeRadius = size / 2;
    return (
      <Select enabled={isSelected}>
        <group
          ref={ref}
          name='tube'
          userData={{ id, selectable: true }}
        >
            <mesh position={[0, (length / 2), 0]}>
                <cylinderGeometry args={[tubeRadius, tubeRadius, length, 64, 1, true]}/>
                <meshStandardMaterial {...textureProps} side={DoubleSide}/>
            </mesh>
            <mesh position={[0, (length / 2), 0]}>
                <cylinderGeometry args={[tubeRadius - .2, tubeRadius - .2, length, 64, 1, true]}/>
                <meshStandardMaterial {...textureProps} side={DoubleSide}/>
            </mesh>
            <mesh ref={startRingRef} position={[0, 0, 0]}>
                <ringGeometry args={[tubeRadius, tubeRadius - .2, 64]}/>
                <meshStandardMaterial {...textureProps} side={DoubleSide}/>
            </mesh>
            <mesh ref={endRingRef} position={[0, length, 0]}>
                <ringGeometry args={[tubeRadius, tubeRadius - .2, 64]}/>
                <meshStandardMaterial {...textureProps} side={DoubleSide}/>
            </mesh>
        </group>
      </Select>
    );
}