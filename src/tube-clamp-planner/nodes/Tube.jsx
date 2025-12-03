import React from 'react';
import { RepeatWrapping } from 'three';
import { useTexture } from '@react-three/drei';
import tubeMap from '../textures/Metal_Galvanized_1K_albedo.png';
import tubeNormalMap from '../textures/Metal_Galvanized_1K_normal.png';
import tubeRoughness from '../textures/Metal_Galvanized_1K_roughness.png';
import tubeMetalic from '../textures/Metal_Galvanized_1K_metallic.png';
import useSelectionStore from '../state/useSelectionStore';
import { Select } from '@react-three/postprocessing';
import { mapObject } from '../../util';
import { Base, Subtraction } from '@react-three/csg';
import CacheGeometry from '../components/CacheGeometry';

export default function Tube({ id, length, size }) {
  const ref = React.useRef();

  const { selectedNodeId } = useSelectionStore();
  const isSelected = id === selectedNodeId;

  const tubeRadius = size / 2;

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
      texture.repeat.setX((size * 3.14) / 8);
      texture.repeat.setY(length / 8);

      return texture;
    },
  );

  return (
    <Select enabled={isSelected}>
      <group
        ref={ref}
        name='tube'
        layers={1}
        userData={{ id, selectable: true }}
      >
        <mesh
          name='tube'
          position={[0, length / 2, 0]}
          scale={[1, length, 1]}
          castShadow={true}
          receiveShadow={true}
        >
          <meshPhysicalMaterial {...textureProps} />
          <CacheGeometry cacheKey={['tube', size]}>
            <Base>
              <cylinderGeometry args={[tubeRadius, tubeRadius, 1, 64, 1]} />
            </Base>
            <Subtraction>
              <cylinderGeometry
                args={[tubeRadius * 0.9, tubeRadius * 0.9, 1, 64, 1]}
              />
            </Subtraction>
          </CacheGeometry>
        </mesh>
      </group>
    </Select>
  );
}
