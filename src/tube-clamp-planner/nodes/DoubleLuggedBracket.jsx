import React from 'react';
import { MathUtils, RepeatWrapping } from 'three';
import { useTexture } from '@react-three/drei';
import { Addition, Base, Subtraction } from '@react-three/csg';
import tubeMap from '../textures/Metal_Galvanized_1K_albedo.png';
import tubeNormalMap from '../textures/Metal_Galvanized_1K_normal.png';
import tubeRoughness from '../textures/Metal_Galvanized_1K_roughness.png';
import tubeMetalic from '../textures/Metal_Galvanized_1K_metallic.png';
import { mapObject } from '../../util';
import CacheGeometry from '../components/CacheGeometry';

export default function DoubleLuggedBracket({ id, size }) {
  const groupRef = React.useRef();

  const tubeRadius = size / 2 + size * 0.1;

  const connectorBase = tubeRadius * 0.1;
  const connectorLength = size * 2;
  const connectorWidth = size / 2;

  const screwHoleRadius = size * 0.1;

  const connectorTextureProps = mapObject(
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
      texture.repeat.setY(connectorWidth / 8);

      return texture;
    },
  );

  return (
    <group
      ref={groupRef}
      name='double-lugged-bracket'
      layers={1}
      userData={{ id, selectable: true }}
    >
      <mesh castShadow={true} receiveShadow={true}>
        <meshPhysicalMaterial {...connectorTextureProps} />
        <CacheGeometry cacheKey={['double-lugged-bracket', size]}>
          <Base position={[0, 0, tubeRadius - connectorBase / 2]}>
            <boxGeometry
              args={[connectorLength, connectorWidth, connectorBase]}
            />
          </Base>
          <Addition>
            <cylinderGeometry
              args={[tubeRadius, tubeRadius, connectorWidth, 64, 1]}
            />
          </Addition>
          <Subtraction>
            <cylinderGeometry
              args={[
                tubeRadius * 0.9,
                tubeRadius * 0.9,
                connectorWidth * 1.1,
                64,
                1,
              ]}
            />
          </Subtraction>
          <Subtraction
            position={[
              connectorLength / 2 - screwHoleRadius * 2,
              0,
              tubeRadius - connectorBase / 2,
            ]}
            rotation={[MathUtils.degToRad(90), 0, 0]}
          >
            <cylinderGeometry
              args={[
                screwHoleRadius,
                screwHoleRadius,
                connectorBase * 1.1,
                64,
                1,
              ]}
            />
          </Subtraction>
          <Subtraction
            position={[
              -(connectorLength / 2 - screwHoleRadius * 2),
              0,
              tubeRadius - connectorBase / 2,
            ]}
            rotation={[MathUtils.degToRad(90), 0, 0]}
          >
            <cylinderGeometry
              args={[
                screwHoleRadius,
                screwHoleRadius,
                connectorBase * 1.1,
                64,
                1,
              ]}
            />
          </Subtraction>
        </CacheGeometry>
      </mesh>
    </group>
  );
}
