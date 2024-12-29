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
import CacheGeometry, { useGeometryCache } from '../components/CacheGeometry';

export default function SingleMaleSwivel({ id, size }) {
  const swivelRef = React.useRef();

  useRotate(swivelRef, { x: 270, z: 90 });

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
      texture.repeat.setX((size * 3.14) / 80);
      texture.repeat.setY((size * 3.14) / 80);

      return texture;
    },
  );

  const tubeRadius = size / 2 + 0.25;
  const tubeThickness = tubeRadius * 1.5;
  const swivelHeight = 1;

  return (
    <group
      name='handrail-bracket'
      layers={1}
      userData={{ id, selectable: true }}
    >
      <TubeSleeveCylinder size={size} />

      <mesh
        ref={swivelRef}
        position={[0, 0, -tubeRadius * 2]}
        castShadow={true}
        receiveShadow={true}
      >
        <meshStandardMaterial {...textureProps} />
        <CacheGeometry cacheKey={['single-male-swivel', size]}>
          <Base>
            <cylinderGeometry
              args={[
                (tubeThickness / 2) * 0.75,
                (tubeThickness / 2) * 0.75,
                swivelHeight,
                64,
                1,
              ]}
            />
          </Base>
          <Addition position={[-tubeRadius / 2, 0, 0]}>
            <boxGeometry
              args={[tubeRadius + 0.2, swivelHeight, tubeThickness * 0.75]}
            />
          </Addition>
          <Subtraction>
            <cylinderGeometry args={[0.2, 0.2, swivelHeight, 64, 1]} />
          </Subtraction>
        </CacheGeometry>
      </mesh>
    </group>
  );
}
