import React from "react";
import { DoubleSide, RepeatWrapping } from 'three'
import { useTexture } from '@react-three/drei'
import tubeMap from "../textures/Metal_Galvanized_1K_albedo.png";
import tubeNormalMap from "../textures/Metal_Galvanized_1K_normal.png";
import tubeRoughness from "../textures/Metal_Galvanized_1K_roughness.png";
import tubeMetalic from "../textures/Metal_Galvanized_1K_metallic.png";
import useSelectionStore from '../state/useSelectionStore'
import { Select } from '@react-three/postprocessing'
import useRotate from '../controls/useRotate'
import { PI } from 'three/examples/jsm/nodes/math/MathNode'
import { mapObject } from '../../util'

export default function Tube({ id, length, size }) {
    const ref = React.useRef();
    const startRingRef = React.useRef();
    const endRingRef = React.useRef();

    const selectedNodeId = useSelectionStore((state) => state.selectedNodeId);
    const isSelected = id === selectedNodeId;

    const textureProps = mapObject(useTexture({
        map: tubeMap,
        normalMap: tubeNormalMap,
        roughnessMap: tubeRoughness,
        metalnessMap: tubeMetalic,
    }), (t) => t.clone(), texture => {
        texture.wrapS = RepeatWrapping;
        texture.wrapT = RepeatWrapping;
        texture.repeat.setX((size * 3.14) / 20);
        texture.repeat.setY(length / 20);

        return texture;
    });

    useRotate(startRingRef, { x: 90, y: 180 });
    useRotate(endRingRef, { x: 90 });

    // React.useEffect(() => setMiddleConnectionPosition(0, [
    //     endPosition[0],
    //     0,
    //     -connectedTube?.node.position,
    // ]), [connectedTube?.node.position]);

    const tubeRadius = size / 2;
    return (
      <Select enabled={isSelected}>
        <group
          ref={ref}
          name='tube'
          layers={1}
          userData={{ id, selectable: true }}
        >
            <mesh position={[0, (length / 2), 0]} castShadow={true}>
                <cylinderGeometry args={[tubeRadius, tubeRadius, length, 64, 1, true]}/>
                <meshPhysicalMaterial {...textureProps} side={DoubleSide} />
            </mesh>
            <mesh position={[0, (length / 2), 0]} castShadow={true}>
                <cylinderGeometry args={[tubeRadius - .2, tubeRadius - .2, length, 64, 1, true]}/>
                <meshPhysicalMaterial {...textureProps} side={DoubleSide} />
            </mesh>
            <mesh ref={startRingRef} position={[0, 0, 0]} castShadow={true}>
                <ringGeometry args={[tubeRadius, tubeRadius - .2, 64]}/>
                <meshPhysicalMaterial {...textureProps} side={DoubleSide} />
            </mesh>
            <mesh ref={endRingRef} position={[0, length, 0]} castShadow={true}>
                <ringGeometry args={[tubeRadius, tubeRadius - .2, 64]}/>
                <meshPhysicalMaterial {...textureProps} side={DoubleSide} />
            </mesh>
        </group>
      </Select>
    );
}