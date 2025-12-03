import React from 'react';
import { RepeatWrapping } from 'three';
import { useTexture } from '@react-three/drei';
import platformMap from '../textures/Wood_FloorOak_1K_albedo.png';
import platformNormalMap from '../textures/Wood_FloorOak_1K_normal.png';
import platformRoughness from '../textures/Wood_FloorOak_1K_roughness.png';
import { mapObject } from '../../util';
import DoubleLuggedBracket from './DoubleLuggedBracket';

export default function Platform({ id, size }) {
  const groupRef = React.useRef();

  const platformWidth = 19.5;
  const platformLength = 50;
  const platformThickness = 4.5;

  const tubeRadius = size / 2 + size * 0.1;

  const platformTextureProps = mapObject(
    useTexture({
      map: platformMap,
      normalMap: platformNormalMap,
      roughnessMap: platformRoughness,
    }),
    (t) => t.clone(),
    (texture) => {
      texture.wrapS = RepeatWrapping;
      texture.wrapT = RepeatWrapping;
      texture.repeat.setX(platformWidth / 16);
      texture.repeat.setY(platformLength / 16);

      return texture;
    },
  );

  const firstConnectionPosition = platformLength / 2 - 5;
  const secondConnectionPosition = -firstConnectionPosition;

  const connectorPositions = [
    firstConnectionPosition,
    firstConnectionPosition - 12.5,
    secondConnectionPosition + 12.5,
    secondConnectionPosition,
  ];

  return (
    <group
      ref={groupRef}
      name='platform'
      layers={1}
      userData={{ id, selectable: true }}
    >
      <mesh
        castShadow={true}
        receiveShadow={true}
        position={[
          0,
          firstConnectionPosition,
          tubeRadius + platformThickness / 2,
        ]}
      >
        <meshPhysicalMaterial {...platformTextureProps} />
        <boxGeometry
          args={[platformWidth, platformLength, platformThickness]}
        />
      </mesh>
      <group position={[0, firstConnectionPosition, 0]}>
        {connectorPositions.map((position) => (
          <group key={position} position={[0, position, 0]}>
            <DoubleLuggedBracket size={size} />
          </group>
        ))}
      </group>
    </group>
  );
}
