import React from 'react';
import { useTexture } from '@react-three/drei';
import tubeMap from '../textures/Metal_Galvanized_1K_albedo.png';
import tubeNormalMap from '../textures/Metal_Galvanized_1K_normal.png';
import tubeRoughness from '../textures/Metal_Galvanized_1K_roughness.png';
import tubeMetalic from '../textures/Metal_Galvanized_1K_metallic.png';
import useRotate from '../controls/useRotate';
import { DoubleSide } from 'three';
import TubeSleeveCylinder from './TubeSleeveCylinder';

export default function Crossover({
  id,
  size,
  middleConnections,
  setMiddleConnectionPosition,
  setMiddleConnectionRotation,
}) {
  const [connectedTube] = middleConnections;

  const ref = React.useRef();
  const secondSleeveRef = React.useRef();

  useRotate(secondSleeveRef, { x: 90 });

  const tubeRadius = size / 2 + 0.25;
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

  return (
    <group
      ref={ref}
      layers={1}
      name='crossover'
      userData={{ id, selectable: true }}
    >
      <TubeSleeveCylinder size={size} />
      <TubeSleeveCylinder
        ref={secondSleeveRef}
        size={size}
        position={endPosition}
      />
    </group>
  );
}
