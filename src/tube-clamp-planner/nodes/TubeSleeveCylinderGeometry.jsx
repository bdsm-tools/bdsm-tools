import React from 'react';
import { Base, Geometry, Subtraction } from '@react-three/csg';

export default function TubeSleeveCylinderGeometry({
  ref,
  size,
  length,
  position,
}) {
  const sleeveRadius = size / 2 + size * 0.1;

  return (
    <Geometry>
      <Base position={position}>
        <cylinderGeometry args={[sleeveRadius, sleeveRadius, length, 64, 1]} />
      </Base>
      <Subtraction position={position}>
        <cylinderGeometry
          args={[sleeveRadius * 0.9, sleeveRadius * 0.9, length, 64, 1]}
        />
      </Subtraction>
    </Geometry>
  );
}
