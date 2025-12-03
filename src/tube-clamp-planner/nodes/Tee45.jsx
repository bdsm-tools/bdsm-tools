import React from 'react';
import { MathUtils, RepeatWrapping } from 'three';
import { Addition, Base, Subtraction } from '@react-three/csg';
import { useTexture } from '@react-three/drei';
import tubeMap from '../textures/Metal_Galvanized_1K_albedo.png';
import tubeNormalMap from '../textures/Metal_Galvanized_1K_normal.png';
import tubeRoughness from '../textures/Metal_Galvanized_1K_roughness.png';
import tubeMetalic from '../textures/Metal_Galvanized_1K_metallic.png';
import useRotate from '../controls/useRotate';
import { _45_DEGREE_DISTANCE_MULTIPLIER, mapObject } from '../../util';
import CacheGeometry from '../components/CacheGeometry';

export default function Tee45({
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
  const tubeOffset = -tubeRadius / 2;
  const tubePosition = size / 1.5;
  const connectorPosition = size / 2;
  const selfPosition = tubeRadius * 0.1;

  React.useEffect(
    () =>
      setMiddleConnectionPosition(0, [
        0,
        -(tubeRadius + selfPosition) -
          (connectedTube?.node?.position || 0) * _45_DEGREE_DISTANCE_MULTIPLIER,
        -(tubeRadius + selfPosition) +
          (connectedTube?.node?.position || 0) * _45_DEGREE_DISTANCE_MULTIPLIER,
      ]),
    [connectedTube?.node?.position, size],
  );
  React.useEffect(() => setMiddleConnectionRotation(0, { x: 315 }), []);

  React.useEffect(
    () =>
      setEndConnectionPosition(0, [
        0,
        tubeOffset + connectorPosition,
        tubeRadius + connectorPosition,
      ]),
    [size],
  );
  React.useEffect(() => setEndConnectionRotation(0, { x: 45 }), []);

  const isEnd = React.useCallback(
    () => connectionSlot === 'end',
    [connectionSlot],
  );
  useRotate(ref, { x: 315 }, isEnd);

  return (
    <group
      ref={ref}
      name='tee-45'
      layers={1}
      userData={{ id, selectable: true }}
      position={
        isEnd()
          ? [0, -(tubeRadius + selfPosition), -(tubeRadius + selfPosition)]
          : [0, 0, 0]
      }
    >
      <mesh castShadow={true} receiveShadow={true}>
        <meshStandardMaterial {...textureProps} />
        <CacheGeometry cacheKey={['tee-45', size]}>
          <Base>
            <cylinderGeometry
              args={[tubeRadius, tubeRadius, tubeRadius * 2, 64, 1]}
            />
          </Base>
          <Addition
            position={[0, 0, tubeRadius * 1.5]}
            rotation={[MathUtils.degToRad(45), 0, 0]}
          >
            <sphereGeometry args={[tubeRadius, 64, 64]} />
          </Addition>
          <Addition
            position={[0, tubeOffset + tubePosition, tubeRadius + tubePosition]}
            rotation={[MathUtils.degToRad(45), 0, 0]}
          >
            <cylinderGeometry
              args={[tubeRadius, tubeRadius, tubeRadius * 2, 64, 1]}
            />
          </Addition>
          <Addition
            position={[0, 0, tubeRadius]}
            rotation={[MathUtils.degToRad(90), 0, 0]}
          >
            <cylinderGeometry
              args={[tubeRadius, tubeRadius, tubeRadius, 64, 1]}
            />
          </Addition>

          <Subtraction>
            <cylinderGeometry
              args={[
                tubeRadius * 0.9,
                tubeRadius * 0.9,
                tubeRadius * 2 + 0.1,
                64,
                1,
              ]}
            />
          </Subtraction>
          <Subtraction
            position={[0, 0, tubeRadius * 1.5]}
            rotation={[MathUtils.degToRad(45), 0, 0]}
          >
            <sphereGeometry args={[tubeRadius * 0.9, 64, 64]} />
          </Subtraction>
          <Subtraction
            position={[0, tubeOffset + tubePosition, tubeRadius + tubePosition]}
            rotation={[MathUtils.degToRad(45), 0, 0]}
          >
            <cylinderGeometry
              args={[
                tubeRadius * 0.9,
                tubeRadius * 0.9,
                tubeRadius * 2 + 0.1,
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
                tubeRadius + 0.1,
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
