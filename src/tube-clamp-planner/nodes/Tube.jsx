import React from "react";
import {DoubleSide} from "three";
import {useTexture} from "@react-three/drei";
import tubeMap from "../textures/Metal_Galvanized_1K_albedo.png";
import tubeNormalMap from "../textures/Metal_Galvanized_1K_normal.png";
import tubeRoughness from "../textures/Metal_Galvanized_1K_roughness.png";
import tubeMetalic from "../textures/Metal_Galvanized_1K_metallic.png";
import useFocusNode from "../controls/useFocusNode";
import useRotate from "../controls/useRotate";

export default function Tube({ position, length, size, rotation, tube, setMiddleConnectionPosition }) {
    const ref = React.useRef();

    const [x,y,z] = position;

    useRotate(ref, rotation);

    React.useEffect(() => {
        tube?.middleConnections?.forEach((c, index) => {
            setMiddleConnectionPosition(index, [x, y + c.position, z]);
        });
    }, []);

    const textureProps = useTexture({
        map: tubeMap,
        normalMap: tubeNormalMap,
        roughnessMap: tubeRoughness,
        metalnessMap: tubeMetalic,
    });

    const focusNode = useFocusNode();

    const tubeRadius = size / 2;
    return (
        <group ref={ref} position={position}>
            <mesh position={[0, (length / 2), 0]} onClick={focusNode}>
                <cylinderGeometry args={[tubeRadius, tubeRadius, length, 64, 1, true]}/>
                <meshStandardMaterial {...textureProps} side={DoubleSide}/>
            </mesh>
        </group>
    );
}