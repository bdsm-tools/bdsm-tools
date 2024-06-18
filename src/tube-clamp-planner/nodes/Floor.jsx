import React from "react";
import { useTexture } from "@react-three/drei";
import floorMap from '../textures/Wood_FloorOak_1K_albedo.png';
import floorHeight from '../textures/Wood_FloorOak_1K_height.png';
import floorNormalMap from '../textures/Wood_FloorOak_1K_normal.png';
import floorRoughness from '../textures/Wood_FloorOak_1K_roughness.png';
import useRotate from '../controls/useRotate'
import { RepeatWrapping } from 'three'

export default function Floor({ length, width }) {
    const ref = React.useRef();
    const textureProps = useTexture({
        map: floorMap,
        displacementMap: floorHeight,
        normalMap: floorNormalMap,
        roughnessMap: floorRoughness,
    });
    Object.values(textureProps).forEach(texture => {
        texture.wrapS = RepeatWrapping;
        texture.wrapT = RepeatWrapping;
        texture.repeat.setX(width / 100);
        texture.repeat.setY(length / 100);
    })

    useRotate(ref, { x: 270 });

    return (
        <mesh
          ref={ref} name='floor'
          position={[width / 2, 0, length / 2]}
          receiveShadow={true}
          userData={{
              id: 'floor',
              selectable: true,
              cameraPositionOnFocus: [width / 2, Math.max(width, length) / 2, length / 2],
          }}
        >
            <planeGeometry args={[width, length]} />
            <meshStandardMaterial {...textureProps} />
        </mesh>
    );
}