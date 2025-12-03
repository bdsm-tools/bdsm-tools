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

export default function HandrailBracket({
  id,
  size,
  connectionSlot,
  middleConnections,
  setMiddleConnectionPosition,
  setMiddleConnectionRotation,
}) {
  const [connectedTube] = middleConnections;

  const ref = React.useRef();
  const baseRef = React.useRef();

  useRotate(baseRef, { x: 90 });

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

  const tubeRadius = size / 2 + size * 0.1;
  const baseDistance = tubeRadius * 1.5;
  const baseHeight = 0.5;
  const screwHoleRadius = size * 0.1;
  const tubePosition = baseDistance + tubeRadius;

  React.useEffect(
    () =>
      setMiddleConnectionPosition(0, [
        0,
        tubePosition,
        -connectedTube?.node?.position || 0,
      ]),
    [connectedTube?.node?.position, size],
  );
  React.useEffect(() => setMiddleConnectionRotation(0, { x: 90 }), []);

  const isSurface = React.useCallback(
    () => connectionSlot !== 'middle',
    [connectionSlot],
  );

  useRotate(ref, { x: 270 }, isSurface);

  return (
    <group
      ref={ref}
      name='handrail-bracket'
      layers={1}
      userData={{ id, selectable: true }}
      position={isSurface() ? [0, tubePosition, 0] : [0, 0, 0]}
    >
      <mesh
        ref={baseRef}
        position={[0, 0, -baseDistance - tubeRadius + baseHeight]}
        castShadow={true}
        receiveShadow={true}
      >
        <meshStandardMaterial {...textureProps} />
        <CacheGeometry cacheKey={['handrail-bracket', size]}>
          <Base>
            <boxGeometry args={[tubeRadius * 3, baseHeight, tubeRadius]} />
          </Base>
          <Addition position={[0, baseDistance / 2 - 0.2, 0]}>
            <boxGeometry args={[tubeRadius * 0.75, baseDistance, baseHeight]} />
          </Addition>
          <Addition position={[0, baseDistance / 2 - 0.2, 0]}>
            <boxGeometry args={[baseHeight, baseDistance, tubeRadius * 0.75]} />
          </Addition>
          <Addition
            position={[0, baseDistance + tubeRadius - baseHeight, 0]}
            rotation={[MathUtils.degToRad(90), 0, 0]}
          >
            <cylinderGeometry
              args={[tubeRadius, tubeRadius, tubeRadius, 64, 1]}
            />
          </Addition>
          <Subtraction
            position={[0, baseDistance + tubeRadius - baseHeight, 0]}
            rotation={[MathUtils.degToRad(90), 0, 0]}
          >
            <cylinderGeometry
              args={[tubeRadius * 0.9, tubeRadius * 0.9, tubeRadius, 64, 1]}
            />
          </Subtraction>
          <Subtraction position={[tubeRadius, 0, 0]}>
            <cylinderGeometry
              args={[screwHoleRadius, screwHoleRadius, baseHeight, 64, 1]}
            />
          </Subtraction>
          <Subtraction position={[-tubeRadius, 0, 0]}>
            <cylinderGeometry
              args={[screwHoleRadius, screwHoleRadius, baseHeight, 64, 1]}
            />
          </Subtraction>
        </CacheGeometry>
      </mesh>
    </group>
  );
}
