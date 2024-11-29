import React, { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { v4 as uuidv4 } from 'uuid';
import { getTypeDefinition } from '../connectors/types';
import { B } from '../sizes';

const PreviewNode = ({ connectorType }) => {
  const ref = useRef();
  const { camera } = useThree();

  const { Node } = getTypeDefinition(connectorType);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.x -= 0.004;
      ref.current.rotation.y -= 0.002;
      ref.current.rotation.z -= 0.006;

      camera.lookAt(ref.current.position);
    }
  });

  return (
    <group ref={ref} position={[0, 0, -7]}>
      <Node
        id={uuidv4()}
        connection={{ type: connectorType }}
        parentConnection={{ type: 'tube' }}
        connectionSlot='end'
        middleConnections={[]}
        endConnections={[]}
        size={B}
        length={5}
        setEndConnectionPosition={() => {}}
        setMiddleConnectionPosition={() => {}}
        setEndConnectionRotation={() => {}}
        setMiddleConnectionRotation={() => {}}
      />
    </group>
  );
};

export default function ConnectorPreview({ connectorType }) {
  return (
    <div style={{ height: '80px', width: '80px' }}>
      <Canvas>
        <ambientLight intensity={0.75} />
        <pointLight position={[5, 20, 5]} power={1000} castShadow={true} />
        <PreviewNode connectorType={connectorType} />
      </Canvas>
    </div>
  );
}
