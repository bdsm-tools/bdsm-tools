import React from 'react';
import { useTexture } from '@react-three/drei';
import wallMap from '../textures/Wall_BrickPainted_1K_albedo.png';
import wallHeight from '../textures/Wall_BrickPainted_1K_height.png';
import wallNormalMap from '../textures/Wall_BrickPainted_1K_normal.png';
import wallRoughness from '../textures/Wall_BrickPainted_1K_roughness.png';
import wallAo from '../textures/Wall_BrickPainted_1K_ao.png';
import useRotate from '../controls/useRotate';
import { RepeatWrapping } from 'three';
import { mapObject } from '../../util';

const heightDistanceModifier = 1.333334;

export default function Wall({ length, width, height }) {
  const ref = React.useRef();
  const sideRef = React.useRef();
  const backRef = React.useRef();
  const backSideRef = React.useRef();

  const wallTextureProps = useTexture({
    map: wallMap,
    displacementMap: wallHeight,
    normalMap: wallNormalMap,
    roughnessMap: wallRoughness,
    aoMap: wallAo,
  });

  const backWallTextureProps = mapObject(
    wallTextureProps,
    (t) => t.clone(),
    (texture) => {
      texture.wrapS = RepeatWrapping;
      texture.wrapT = RepeatWrapping;
      texture.repeat.setX(width / 200);
      texture.repeat.setY(height / 200);

      return texture;
    },
  );
  const sideWallTextureProps = mapObject(
    wallTextureProps,
    (t) => t.clone(),
    (texture) => {
      texture.wrapS = RepeatWrapping;
      texture.wrapT = RepeatWrapping;
      texture.repeat.setX(length / 200);
      texture.repeat.setY(height / 200);

      return texture;
    },
  );

  useRotate(sideRef, { y: 90 });
  useRotate(backRef, { y: 180 });
  useRotate(backSideRef, { y: 270 });

  return (
    <>
      <mesh
        ref={ref}
        name='wall'
        position={[width / 2, height / 2, 0]}
        castShadow={true}
        receiveShadow={true}
        userData={{
          id: 'back-wall',
          selectable: true,
          requiresNothingSelected: true,
          cameraPositionOnFocus: [
            width / 2,
            height / 2,
            Math.max(width, height * heightDistanceModifier) / 2,
          ],
        }}
      >
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial {...backWallTextureProps} />
      </mesh>
      <mesh
        ref={sideRef}
        name='wall'
        position={[0, height / 2, length / 2]}
        receiveShadow={true}
        userData={{
          id: 'side-wall',
          selectable: true,
          requiresNothingSelected: true,
          cameraPositionOnFocus: [
            Math.max(length, height * heightDistanceModifier) / 2,
            height / 2,
            length / 2,
          ],
        }}
      >
        <planeGeometry args={[length, height]} />
        <meshStandardMaterial {...sideWallTextureProps} />
      </mesh>
      <mesh
        ref={backRef}
        name='wall'
        position={[width / 2, height / 2, length]}
        receiveShadow={true}
        userData={{
          id: 'back-wall2',
          selectable: true,
          requiresNothingSelected: true,
          cameraPositionOnFocus: [
            width / 2,
            height / 2,
            length - Math.max(width, height * heightDistanceModifier) / 2,
          ],
        }}
      >
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial {...backWallTextureProps} />
      </mesh>
      <mesh
        ref={backSideRef}
        name='wall'
        position={[width, height / 2, length / 2]}
        receiveShadow={true}
        userData={{
          id: 'side-wall2',
          selectable: true,
          requiresNothingSelected: true,
          cameraPositionOnFocus: [
            width - Math.max(length, height * heightDistanceModifier) / 2,
            height / 2,
            length / 2,
          ],
        }}
      >
        <planeGeometry args={[length, height]} />
        <meshStandardMaterial {...sideWallTextureProps} />
      </mesh>
    </>
  );
}
