import React from "react";
import {DoubleSide} from "three";
import {useTexture} from "@react-three/drei";
import tubeMap from "../textures/Metal_Galvanized_1K_albedo.png";
import tubeNormalMap from "../textures/Metal_Galvanized_1K_normal.png";
import tubeRoughness from "../textures/Metal_Galvanized_1K_roughness.png";
import tubeMetalic from "../textures/Metal_Galvanized_1K_metallic.png";
import useFocusNode from "../controls/useFocusNode";

export default function Tube({ position, length, size }) {
    const ref = React.useRef();

    const textureProps = useTexture({
        map: tubeMap,
        normalMap: tubeNormalMap,
        roughnessMap: tubeRoughness,
        metalnessMap: tubeMetalic,
    });

    const focusNode = useFocusNode();

    const [x,y,z] = position;
    const tubeRadius = size / 2;
    return (
        <>
            <mesh ref={ref} position={[x, y + (length / 2), z]} onClick={focusNode}>
                <cylinderGeometry args={[tubeRadius, tubeRadius, length, 64, 1, true]}/>
                <meshStandardMaterial {...textureProps} side={DoubleSide}/>
            </mesh>
        </>
    );
}