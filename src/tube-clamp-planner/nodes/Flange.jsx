import React from 'react';
import { RepeatWrapping } from 'three';
import { useTexture } from '@react-three/drei';
import tubeMap from '../textures/Metal_Galvanized_1K_albedo.png';
import tubeNormalMap from '../textures/Metal_Galvanized_1K_normal.png';
import tubeRoughness from '../textures/Metal_Galvanized_1K_roughness.png';
import tubeMetalic from '../textures/Metal_Galvanized_1K_metallic.png';
import { mapObject } from '../../util';
import TubeSleeveCylinder from './TubeSleeveCylinder';
import { Base, Subtraction } from '@react-three/csg';
import CacheGeometry from '../components/CacheGeometry';

export default function Flange({ id, size, setEndConnectionPosition }) {
  const groupRef = React.useRef();

  const baseRadius = size * 1.5;
  const baseHeight = size / 3;

  const neckRadius = size / 2 + 0.25;
  const neckHeight = size * 1.1;

  const screwHoleRadius = size * 0.1;

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
      texture.repeat.setX((size * 3.14) / 8);
      texture.repeat.setY((baseHeight + neckHeight) / 8);

      return texture;
    },
  );

  React.useEffect(() => setEndConnectionPosition(0, [0, baseHeight, 0]), []);

  return (
    <group
      ref={groupRef}
      name='flange'
      layers={1}
      userData={{ id, selectable: true }}
    >
      <mesh
        position={[0, baseHeight / 2, 0]}
        castShadow={true}
        receiveShadow={true}
      >
        <meshPhysicalMaterial {...textureProps} />
        <CacheGeometry cacheKey={['flange', size]}>
          <Base>
            <cylinderGeometry
              args={[baseRadius, baseRadius, baseHeight, 64, 1]}
            />
          </Base>
          <Subtraction>
            <cylinderGeometry
              args={[neckRadius * 0.75, neckRadius * 0.75, baseHeight, 64, 1]}
            />
          </Subtraction>
          <Subtraction position={[baseRadius / 2, 0, baseRadius / 2]}>
            <cylinderGeometry
              args={[screwHoleRadius, screwHoleRadius, baseHeight, 64, 1]}
            />
          </Subtraction>
          <Subtraction position={[-baseRadius / 2, 0, baseRadius / 2]}>
            <cylinderGeometry
              args={[screwHoleRadius, screwHoleRadius, baseHeight, 64, 1]}
            />
          </Subtraction>
          <Subtraction position={[baseRadius / 2, 0, -baseRadius / 2]}>
            <cylinderGeometry
              args={[screwHoleRadius, screwHoleRadius, baseHeight, 64, 1]}
            />
          </Subtraction>
          <Subtraction position={[-baseRadius / 2, 0, -baseRadius / 2]}>
            <cylinderGeometry
              args={[screwHoleRadius, screwHoleRadius, baseHeight, 64, 1]}
            />
          </Subtraction>
        </CacheGeometry>
      </mesh>
      <TubeSleeveCylinder
        name='flange_neck'
        size={size}
        length={neckHeight}
        position={[0, neckHeight / 2, 0]}
      />
    </group>
  );
}
