import React from 'react';
import { DoubleSide, Euler, MathUtils, RepeatWrapping } from 'three';
import { Addition, Base, Geometry, Subtraction } from '@react-three/csg';
import { useTexture } from '@react-three/drei';
import tubeMap from '../textures/Metal_Galvanized_1K_albedo.png';
import tubeNormalMap from '../textures/Metal_Galvanized_1K_normal.png';
import tubeRoughness from '../textures/Metal_Galvanized_1K_roughness.png';
import tubeMetalic from '../textures/Metal_Galvanized_1K_metallic.png';
import useRotate from '../controls/useRotate';
import TubeSleeveCylinder from './TubeSleeveCylinder';
import { mapObject } from '../../util';

export default function Corner({
  id,
  size,
  setEndConnectionPosition,
  setEndConnectionRotation,
}) {
  const ref = React.useRef();
  const secondSleeveRef = React.useRef();
  const middleRef = React.useRef();

  useRotate(secondSleeveRef, { x: 90 });
  useRotate(middleRef, { x: 135 });

  const textureProps = mapObject(
    useTexture({
      map: tubeMap,
      normalMap: tubeNormalMap,
      roughnessMap: tubeRoughness,
      metalnessMap: tubeMetalic,
    }),
    (t) => t.clone(),
    (texture) => {
      texture.wrapS = RepeatWrapping;
      texture.wrapT = RepeatWrapping;
      texture.repeat.setX((size * 3.14) / 2);
      texture.repeat.setY((size * 3.14) / 2);

      return texture;
    },
  );

  const tubeRadius = size / 2 + 0.25;
  const tubeHeight = 0.04;
  const endPosition = [0, -(tubeHeight / 2), tubeHeight / 2];

  React.useEffect(() => setEndConnectionPosition(0, endPosition), []);
  React.useEffect(() => setEndConnectionRotation(0, { x: 90 }), []);

  return (
    <group
      ref={ref}
      name='corner'
      layers={1}
      userData={{ id, selectable: true }}
    >
      <mesh
        ref={middleRef}
        position={[0, -(tubeHeight / 2), 0]}
        castShadow={true}
        receiveShadow={true}
      >
        <sphereGeometry args={[tubeRadius, 64, 64]} />
        <meshStandardMaterial {...textureProps} />
      </mesh>

      <TubeSleeveCylinder size={size} />
      <TubeSleeveCylinder
        ref={secondSleeveRef}
        size={size}
        position={endPosition}
      />
    </group>
  );
}
