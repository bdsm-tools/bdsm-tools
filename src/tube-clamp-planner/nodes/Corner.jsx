import React from 'react';
import { DoubleSide, Euler, MathUtils, RepeatWrapping } from 'three';
import { Addition, Base, Geometry, Subtraction } from '@react-three/csg';
import { useTexture } from '@react-three/drei';
import tubeMap from '../textures/Metal_Galvanized_1K_albedo.png';
import tubeNormalMap from '../textures/Metal_Galvanized_1K_normal.png';
import tubeRoughness from '../textures/Metal_Galvanized_1K_roughness.png';
import tubeMetalic from '../textures/Metal_Galvanized_1K_metallic.png';
import useRotate from '../controls/useRotate';
import TubeSleeveCylinderGeometry from './TubeSleeveCylinderGeometry';
import { mapObject } from '../../util';
import CacheGeometry from '../components/CacheGeometry';

export default function Corner({
  id,
  size,
  setEndConnectionPosition,
  setEndConnectionRotation,
}) {
  const ref = React.useRef();

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
      texture.repeat.setX((size * 3.14) / 40);
      texture.repeat.setY((size * 3.14) / 40);

      return texture;
    },
  );

  const tubeRadius = size / 2 + size * 0.1;
  const tubeHeight = size * 1.2;
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
        position={[0, -(tubeHeight / 2), 0]}
        castShadow={true}
        receiveShadow={true}
      >
        <meshStandardMaterial {...textureProps} />
        <CacheGeometry cacheKey={['corner', size]}>
          <Base>
            <sphereGeometry args={[tubeRadius, 64, 64]} />
          </Base>
          <Addition position={[0, tubeRadius, 0]}>
            <cylinderGeometry
              args={[tubeRadius, tubeRadius, tubeHeight, 64, 1]}
            />
          </Addition>
          <Addition
            position={[0, 0, tubeRadius]}
            rotation={[MathUtils.degToRad(90), 0, 0]}
          >
            <cylinderGeometry
              args={[tubeRadius, tubeRadius, tubeHeight, 64, 1]}
            />
          </Addition>
          <Subtraction position={[0, tubeRadius, 0]}>
            <cylinderGeometry
              args={[
                tubeRadius * 0.9,
                tubeRadius * 0.9,
                tubeHeight + 0.1,
                64,
                1,
              ]}
            />
          </Subtraction>
          <Subtraction
            position={[0, 0, tubeRadius]}
            rotation={[MathUtils.degToRad(90), 0, 0]}
          >
            <cylinderGeometry
              args={[
                tubeRadius * 0.9,
                tubeRadius * 0.9,
                tubeHeight + 0.1,
                64,
                1,
              ]}
            />
          </Subtraction>
          <Subtraction>
            <sphereGeometry args={[tubeRadius * 0.9, 64, 64]} />
          </Subtraction>
        </CacheGeometry>
      </mesh>
    </group>
  );
}
