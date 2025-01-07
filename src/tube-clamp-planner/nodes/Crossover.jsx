import React from 'react';
import { useTexture } from '@react-three/drei';
import tubeMap from '../textures/Metal_Galvanized_1K_albedo.png';
import tubeNormalMap from '../textures/Metal_Galvanized_1K_normal.png';
import tubeRoughness from '../textures/Metal_Galvanized_1K_roughness.png';
import tubeMetalic from '../textures/Metal_Galvanized_1K_metallic.png';
import useRotate from '../controls/useRotate';
import { DoubleSide, MathUtils, RepeatWrapping } from 'three';
import TubeSleeveCylinderGeometry from './TubeSleeveCylinderGeometry';
import CacheGeometry from '../components/CacheGeometry';
import { Addition, Base, Subtraction } from '@react-three/csg';
import { mapObject } from '../../util';

export default function Crossover({
  id,
  size,
  middleConnections,
  setMiddleConnectionPosition,
  setMiddleConnectionRotation,
}) {
  const [connectedTube] = middleConnections;

  const ref = React.useRef();

  const tubeRadius = size / 2 + size * 0.1;
  const endPosition = [tubeRadius * 2 - 0.5, 0, 0];

  React.useEffect(
    () =>
      setMiddleConnectionPosition(0, [
        endPosition[0],
        0,
        -connectedTube?.node?.position || 0,
      ]),
    [connectedTube?.node?.position],
  );
  React.useEffect(() => setMiddleConnectionRotation(0, { x: 90 }), []);

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
      texture.repeat.setY((size * 3.14) / 40);

      return texture;
    },
  );

  return (
    <group
      ref={ref}
      layers={1}
      name='crossover'
      userData={{ id, selectable: true }}
    >
      <mesh castShadow={true} receiveShadow={true}>
        <meshStandardMaterial {...textureProps} />
        <CacheGeometry cacheKey={['crossover', size]}>
          <Base>
            <cylinderGeometry
              args={[tubeRadius, tubeRadius, tubeRadius * 2, 64, 1]}
            />
          </Base>
          <Addition
            position={endPosition}
            rotation={[MathUtils.degToRad(90), 0, 0]}
          >
            <cylinderGeometry
              args={[tubeRadius, tubeRadius, tubeRadius * 2, 64, 1]}
            />
          </Addition>
          <Subtraction
            position={endPosition}
            rotation={[MathUtils.degToRad(90), 0, 0]}
          >
            <cylinderGeometry
              args={[tubeRadius * 0.9, tubeRadius * 0.9, tubeRadius * 2, 64, 1]}
            />
          </Subtraction>
          <Subtraction>
            <cylinderGeometry
              args={[tubeRadius * 0.9, tubeRadius * 0.9, tubeRadius * 2, 64, 1]}
            />
          </Subtraction>
        </CacheGeometry>
      </mesh>
    </group>
  );
}
