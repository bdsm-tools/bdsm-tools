import React from 'react';
import { DoubleSide, Euler, MathUtils } from 'three';
import { Addition, Base, Geometry, Subtraction } from '@react-three/csg';
import { useTexture } from '@react-three/drei';
import tubeMap from '../textures/Metal_Galvanized_1K_albedo.png';
import tubeNormalMap from '../textures/Metal_Galvanized_1K_normal.png';
import tubeRoughness from '../textures/Metal_Galvanized_1K_roughness.png';
import tubeMetalic from '../textures/Metal_Galvanized_1K_metallic.png';
import useRotate from '../controls/useRotate';

export default function Corner({
  id,
  size,
  connection,
  parentConnection,
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
  const endInnerRef = React.useRef();
  const endRingStartRef = React.useRef();
  const endRingEndRef = React.useRef();

  useRotate(endRef, { x: 90 });
  useRotate(endInnerRef, { x: 90 });
  useRotate(endRingStartRef, { y: 180 });

  const textureProps = useTexture({
    map: tubeMap,
    normalMap: tubeNormalMap,
    roughnessMap: tubeRoughness,
    metalnessMap: tubeMetalic,
  });

  const tubeRadius = size / 2 + 0.25;
  const tubeHeight = 4;
  const baseDistance = tubeRadius * 1.5;
  const baseHeight = .5;

  React.useEffect(
    () =>
      setMiddleConnectionPosition(0, [
        0,
        baseDistance + (baseHeight / 2) + tubeRadius,
        -connectedTube?.node?.position || 0,
      ]),
    [connectedTube?.node?.position],
  );
  React.useEffect(() => setMiddleConnectionRotation(0, { x: 90 }), []);

  const isMiddle = React.useCallback(
    () => connectionSlot === 'middle',
    [connectionSlot],
  );
  useRotate(ref, { x: 270 }, isMiddle);
  useRotate(ref, { x: 180 }, () => !isMiddle());

  return (
    <group
      ref={ref}
      name='handrail-bracket'
      layers={1}
      userData={{ id, selectable: true }}
      position={isMiddle() ? [0, 0, -(tubeHeight / 2)] : [0, baseDistance + (baseHeight / 2), 0]}
    >
      <mesh ref={endRef} position={[0, -tubeRadius, 0]}>
        <cylinderGeometry
          args={[tubeRadius, tubeRadius, tubeRadius, 64, 1, true]}
        />
        <meshStandardMaterial {...textureProps} side={DoubleSide}/>
      </mesh>
      <mesh ref={endInnerRef} position={[0, -tubeRadius, 0]}>
        <cylinderGeometry
          args={[
            tubeRadius - 0.2,
            tubeRadius - 0.2,
            tubeRadius,
            64,
            1,
            true,
          ]}
        />
        <meshStandardMaterial {...textureProps} side={DoubleSide}/>
      </mesh>
      <mesh ref={endRingStartRef} position={[0, -tubeRadius, tubeRadius / 2]}>
        <ringGeometry args={[tubeRadius, tubeRadius - 0.2, 64]}/>
        <meshStandardMaterial {...textureProps} side={DoubleSide}/>
      </mesh>
      <mesh ref={endRingEndRef} position={[0, -tubeRadius, -tubeRadius / 2]}>
        <ringGeometry args={[tubeRadius, tubeRadius - 0.2, 64]}/>
        <meshStandardMaterial {...textureProps} side={DoubleSide}/>
      </mesh>

      <mesh
        position={[0, baseDistance, 0]}
        castShadow={true}
      >
        <boxGeometry args={[tubeRadius * 3, baseHeight, tubeRadius]}/>
        <meshStandardMaterial {...textureProps} side={DoubleSide}/>
      </mesh>
      <mesh
        position={[0, (baseDistance / 2) - .2, 0]}
        castShadow={true}
      >
        <boxGeometry args={[tubeRadius * .75, baseDistance, baseHeight]}/>
        <meshStandardMaterial {...textureProps} side={DoubleSide}/>
      </mesh>
      <mesh
        position={[0, (baseDistance / 2) - .2, 0]}
        castShadow={true}
      >
        <boxGeometry args={[baseHeight, baseDistance, tubeRadius * .75]}/>
        <meshStandardMaterial {...textureProps} side={DoubleSide}/>
      </mesh>
    </group>
  );
}
