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

export default function Tee90({
  id,
  size,
  connectionSlot,
  middleConnections,
  setMiddleConnectionPosition,
  setMiddleConnectionRotation,
  setEndConnectionPosition,
  setEndConnectionRotation,
}) {
  const [connectedTube] = middleConnections;

  const ref = React.useRef();
  const endRef = React.useRef();

  useRotate(endRef, { x: 270 });

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
  const tubeHeight = size * 1.5;

  React.useEffect(
    () =>
      setMiddleConnectionPosition(0, [
        0,
        -tubeRadius,
        -connectedTube?.node?.position || 0,
      ]),
    [connectedTube?.node?.position],
  );
  React.useEffect(() => setMiddleConnectionRotation(0, { x: 90 }), []);

  React.useEffect(() => setEndConnectionPosition(0, [0, 0, -tubeRadius]), []);
  React.useEffect(() => setEndConnectionRotation(0, { x: 270 }), []);

  const isEnd = React.useCallback(
    () => connectionSlot === 'end',
    [connectionSlot],
  );
  useRotate(ref, { x: 90 }, isEnd);

  return (
    <group
      ref={ref}
      name='tee'
      layers={1}
      userData={{ id, selectable: true }}
      position={isEnd() ? [0, -tubeRadius, 0] : [0, 0, 0]}
    >
      <mesh
        ref={endRef}
        position={[0, 0, -(tubeHeight / 2)]}
        castShadow={true}
        receiveShadow={true}
      >
        <meshStandardMaterial {...textureProps} />
        <CacheGeometry cacheKey={['tee-90', size]}>
          <Base>
            <cylinderGeometry
              args={[tubeRadius, tubeRadius, tubeHeight, 64, 1]}
            />
          </Base>
          <Addition
            position={[0, -(tubeHeight / 2), 0]}
            rotation={[MathUtils.degToRad(90), 0, 0]}
          >
            <cylinderGeometry
              args={[tubeRadius, tubeRadius, tubeRadius * 2, 64, 1]}
            />
          </Addition>
          <Subtraction
            position={[0, -(tubeHeight / 2), 0]}
            rotation={[MathUtils.degToRad(90), 0, 0]}
          >
            <cylinderGeometry
              args={[tubeRadius * 0.9, tubeRadius * 0.9, tubeRadius * 2, 64, 1]}
            />
          </Subtraction>
          <Subtraction>
            <cylinderGeometry
              args={[tubeRadius * 0.9, tubeRadius * 0.9, tubeHeight, 64, 1]}
            />
          </Subtraction>
          {/*<Subtraction*/}
          {/*  position={[0, -tubeRadius, 0]}*/}
          {/*  rotation={new Euler(MathUtils.degToRad(90), 0, 0)}*/}
          {/*>*/}
          {/*  <cylinderGeometry*/}
          {/*    args={[tubeRadius, tubeRadius, tubeRadius * 2, 64, 1]}*/}
          {/*  />*/}
          {/*</Subtraction>*/}
        </CacheGeometry>
      </mesh>
    </group>
  );
}
