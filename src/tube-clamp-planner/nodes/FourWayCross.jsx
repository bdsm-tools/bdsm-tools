import React from 'react';
import { DoubleSide, Euler, MathUtils, RepeatWrapping } from 'three';
import { Addition, Base, Geometry, Subtraction } from '@react-three/csg';
import { useTexture } from '@react-three/drei';
import tubeMap from '../textures/Metal_Galvanized_1K_albedo.png';
import tubeNormalMap from '../textures/Metal_Galvanized_1K_normal.png';
import tubeRoughness from '../textures/Metal_Galvanized_1K_roughness.png';
import tubeMetalic from '../textures/Metal_Galvanized_1K_metallic.png';
import useRotate from '../controls/useRotate';
import { mapObject } from '../../util';
import CacheGeometry from '../components/CacheGeometry';

export default function FourWayCross({
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
      texture.repeat.setY((size * 3.14) / 20);

      return texture;
    },
  );

  const isMiddle = React.useCallback(
    () => connectionSlot === 'middle',
    [connectionSlot],
  );
  const isEnd = React.useCallback(
    () => connectionSlot === 'end',
    [connectionSlot],
  );

  const tubeRadius = size / 2;
  const sleeveRadius = tubeRadius + size * 0.1;
  const endPosition = isMiddle() ? [0, 0, 0] : [0, -tubeRadius, 0];

  React.useEffect(() => {
    if (isMiddle()) {
      setEndConnectionPosition(0, [0, 0, -tubeRadius]);
      setEndConnectionPosition(1, [tubeRadius, 0, 0]);
      setEndConnectionPosition(2, [0, 0, tubeRadius]);
      setEndConnectionPosition(3, [-tubeRadius, 0, 0]);

      setEndConnectionRotation(0, { x: 270 });
      setEndConnectionRotation(1, { z: 270 });
      setEndConnectionRotation(2, { x: 90 });
      setEndConnectionRotation(3, { z: 90 });
    } else {
      setEndConnectionPosition(0, [0, -tubeRadius, -tubeRadius]);
      setEndConnectionPosition(1, [0, -tubeRadius * 2, 0]);
      setEndConnectionPosition(2, [0, -tubeRadius, tubeRadius]);

      setEndConnectionRotation(0, { x: 270 });
      setEndConnectionRotation(1, { x: 180 });
      setEndConnectionRotation(2, { x: 90 });

      setMiddleConnectionRotation(0, { z: 90 });
    }
  }, [size]);

  React.useEffect(
    () =>
      setMiddleConnectionPosition(0, [
        connectedTube?.node?.position || 0,
        endPosition[1],
        0,
      ]),
    [connectedTube?.node?.position, size],
  );

  useRotate(ref, { z: 90 }, isMiddle);
  useRotate(ref, { x: 270 }, isEnd);

  return (
    <group
      ref={ref}
      name='4-way-cross'
      layers={1}
      userData={{ id, selectable: true }}
      position={endPosition}
    >
      <mesh castShadow={true} receiveShadow={true}>
        <meshPhysicalMaterial {...textureProps} />
        <CacheGeometry cacheKey={['4-way-cross', size]}>
          <Base rotation={[0, 0, MathUtils.degToRad(90)]}>
            <cylinderGeometry
              args={[sleeveRadius, sleeveRadius, sleeveRadius * 2.2, 64, 1]}
            />
          </Base>
          <Addition>
            <cylinderGeometry
              args={[sleeveRadius, sleeveRadius, sleeveRadius * 4, 64, 1]}
            />
          </Addition>
          <Addition rotation={[MathUtils.degToRad(90), 0, 0]}>
            <cylinderGeometry
              args={[sleeveRadius, sleeveRadius, sleeveRadius * 4, 64, 1]}
            />
          </Addition>

          <Subtraction rotation={[0, 0, MathUtils.degToRad(90)]}>
            <cylinderGeometry
              args={[
                sleeveRadius * 0.9,
                sleeveRadius * 0.9,
                sleeveRadius * 2.2,
                64,
                1,
              ]}
            />
          </Subtraction>
          <Subtraction>
            <cylinderGeometry
              args={[
                sleeveRadius * 0.9,
                sleeveRadius * 0.9,
                sleeveRadius * 4,
                64,
                1,
              ]}
            />
          </Subtraction>
          <Subtraction rotation={[MathUtils.degToRad(90), 0, 0]}>
            <cylinderGeometry
              args={[
                sleeveRadius * 0.9,
                sleeveRadius * 0.9,
                sleeveRadius * 4,
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
