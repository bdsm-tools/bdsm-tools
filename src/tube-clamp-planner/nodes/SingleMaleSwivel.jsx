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
import CacheGeometry, { useGeometryCache } from '../components/CacheGeometry';

export default function SingleMaleSwivel({ id, size }) {
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
      texture.repeat.setX((size * 3.14) / 20);
      texture.repeat.setY((size * 3.14) / 40);

      return texture;
    },
  );

  const tubeRadius = size / 2 + size * 0.1;
  const tubeThickness = tubeRadius * 1.25;
  const swivelHeight = size / 4;
  const screwHoleRadius = size * 0.1;

  return (
    <group
      name='handrail-bracket'
      layers={1}
      userData={{ id, selectable: true }}
    >
      <mesh
        castShadow={true}
        receiveShadow={true}
      >
        <meshStandardMaterial {...textureProps} />
        <CacheGeometry cacheKey={['single-male-swivel', size]}>
          <Base>
            <cylinderGeometry
              args={[tubeRadius, tubeRadius, tubeRadius * 2, 64, 1]}
            />
          </Base>
          <Addition position={[(tubeRadius * 1.5) + swivelHeight, 0, 0]} rotation={[MathUtils.degToRad(90), 0, 0]}>
            <cylinderGeometry
              args={[
                tubeThickness / 2,
                tubeThickness / 2,
                swivelHeight,
                64,
                1
              ]}
            />
          </Addition>
          <Addition position={[tubeRadius + swivelHeight, 0, 0]}>
            <boxGeometry
              args={[tubeRadius, tubeThickness, swivelHeight]}
            />
          </Addition>
          <Subtraction>
            <cylinderGeometry
              args={[tubeRadius * 0.9, tubeRadius * 0.9, tubeRadius * 2, 64, 1]}
            />
          </Subtraction>
          <Subtraction position={[(tubeRadius * 1.5) + swivelHeight, 0, 0]} rotation={[MathUtils.degToRad(90), 0, 0]}>
            <cylinderGeometry args={[screwHoleRadius, screwHoleRadius, swivelHeight, 64, 1]} />
          </Subtraction>
        </CacheGeometry>
      </mesh>
    </group>
  );
}
