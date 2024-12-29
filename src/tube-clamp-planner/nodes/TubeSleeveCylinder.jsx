import React from 'react';
import { Base, Geometry, Subtraction } from '@react-three/csg';
import { BufferGeometryLoader, RepeatWrapping } from 'three';
import CacheGeometry, { useGeometryCache } from '../components/CacheGeometry';
import { mapObject } from '../../util';
import { useTexture } from '@react-three/drei';
import tubeMap from '../textures/Metal_Galvanized_1K_albedo.png';
import tubeNormalMap from '../textures/Metal_Galvanized_1K_normal.png';
import tubeRoughness from '../textures/Metal_Galvanized_1K_roughness.png';
import tubeMetalic from '../textures/Metal_Galvanized_1K_metallic.png';

const TubeSleeveCylinder = React.forwardRef(
  ({ name, size, length, position }, ref) => {
    const sleeveRadius = size / 2 + size * 0.1;

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
      <mesh
        name={name}
        ref={ref}
        position={position}
        castShadow={true}
        receiveShadow={true}
        scale={[1, length || sleeveRadius * 2, 1]}
      >
        <meshPhysicalMaterial {...textureProps} />
        <CacheGeometry cacheKey={['sleeve', size]}>
          <Base>
            <cylinderGeometry args={[sleeveRadius, sleeveRadius, 1, 64, 1]} />
          </Base>
          <Subtraction>
            <cylinderGeometry
              args={[sleeveRadius * 0.9, sleeveRadius * 0.9, 1, 64, 1]}
            />
          </Subtraction>
        </CacheGeometry>
      </mesh>
    );
  },
);

export default TubeSleeveCylinder;
