import React from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import {
  getTypeDefinition,
  getTypeDefinitionsAsOptions,
} from '../connectors/types';
import Base from './Base';
import { OrbitControls } from '@react-three/drei';
import { v4 as uuidv4 } from 'uuid';
import { sizes } from '../sizes';
import { cacheOptions, geometryCache } from './CacheGeometry';
import { downloadJSON } from '../../util';

const Controls = ({}) => {
  const { camera } = useThree();

  React.useEffect(() => {
    camera.position.set(20, 50, 200);
    camera.lookAt(40, 40, 100);
  }, []);

  React.useEffect(() => {
    setTimeout(() => {
      downloadJSON(geometryCache, 'connector-geometry.pregen.json');
    }, 1000);
  }, []);

  return null;
};

export default function ConnectorPreviewCanvas({}) {
  const nodes = getTypeDefinitionsAsOptions(({ Node }) => !!Node).map(
    ({ value }) => getTypeDefinition(value),
  );

  React.useEffect(() => {
    cacheOptions.enabled = false;
    return () => {
      cacheOptions.enabled = true;
    };
  }, []);

  return (
    <Canvas id='mesh-canvas'>
      <ambientLight intensity={0.75} />
      <pointLight position={[500, 2000, 500]} power={1000} castShadow={true} />
      <OrbitControls />
      <Controls />

      {nodes.flatMap(({ type, Node }, connectorIndex) =>
        Object.values(sizes).map((size, sizeIndex) => (
          <group
            key={type + size}
            position={[(connectorIndex + 1) * 20, (sizeIndex + 1) * 20, 100]}
          >
            <Node
              id={uuidv4()}
              connection={{ type }}
              parentConnection={{ type: type === 'tube' ? 'flange' : 'tube' }}
              connectionSlot='end'
              middleConnections={[]}
              endConnections={[]}
              size={size}
              length={5}
              setEndConnectionPosition={() => {}}
              setMiddleConnectionPosition={() => {}}
              setEndConnectionRotation={() => {}}
              setMiddleConnectionRotation={() => {}}
            />
          </group>
        )),
      )}

      <Base length={nodes.length * 200} width={1000} height={2000} />
    </Canvas>
  );
}
