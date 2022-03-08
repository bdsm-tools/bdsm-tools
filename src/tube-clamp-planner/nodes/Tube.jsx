import React from "react";
import {useTexture} from "@react-three/drei";
import tubeMap from "../textures/Metal_Galvanized_1K_albedo.png";
import tubeNormalMap from "../textures/Metal_Galvanized_1K_normal.png";
import tubeRoughness from "../textures/Metal_Galvanized_1K_roughness.png";
import tubeMetalic from "../textures/Metal_Galvanized_1K_metallic.png";

export default function Tube({ length, size }) {
    const ref = React.useRef();

    const textureProps = useTexture({
        map: tubeMap,
        normalMap: tubeNormalMap,
        roughnessMap: tubeRoughness,
        metalnessMap: tubeMetalic,
    });

    return (
        <>
            <mesh ref={ref} position={[50, 50, 50]}>
                <cylinderGeometry args={[size / 2, size / 2, length, 64, 1, true]} />
                <meshStandardMaterial {...textureProps} />
            </mesh>
        </>
    );
}