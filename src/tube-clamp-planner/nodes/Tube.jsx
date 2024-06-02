import React from "react";
import { DoubleSide } from 'three'
import { useTexture } from '@react-three/drei'
import tubeMap from "../textures/Metal_Galvanized_1K_albedo.png";
import tubeNormalMap from "../textures/Metal_Galvanized_1K_normal.png";
import tubeRoughness from "../textures/Metal_Galvanized_1K_roughness.png";
import tubeMetalic from "../textures/Metal_Galvanized_1K_metallic.png";

export default function Tube({ id, length, size }) {
    const ref = React.useRef();

    const textureProps = useTexture({
        map: tubeMap,
        normalMap: tubeNormalMap,
        roughnessMap: tubeRoughness,
        metalnessMap: tubeMetalic,
    });

    const tubeRadius = size / 2;
    return (
        <group
          ref={ref}
          name='tube'
          userData={{ id, selectable: true }}
        >
            <mesh position={[0, (length / 2), 0]}>
                <cylinderGeometry args={[tubeRadius, tubeRadius, length, 64, 1, true]}/>
                <meshStandardMaterial {...textureProps} side={DoubleSide}/>
            </mesh>
        </group>
    );
}