import React from 'react'
import { getTypeDefinition } from '../connectors/types'
import { B } from '../sizes'
import Tube from '../nodes/Tube'
import useRotate from '../controls/useRotate'
import useSelectionStore from '../state/useSelectionStore'
import { Select } from '@react-three/postprocessing'

const TubeNode = ({ chain, tube, position, size, rotation }) => {
  const groupRef = React.useRef();
  useRotate(groupRef, rotation);

  const [end1, end2] = tube.children.end;

  return (
    <group ref={groupRef} position={position}>
      <Tube
        id={tube.id}
        tube={tube.node}
        length={tube.node.length}
        size={size}
      />
      {tube.children.middle?.map(id => chain[id]).map((middle, index) => (
        <ChainNode
          chain={chain}
          key={middle.id}
          connection={middle}
          position={[0, middle.node.position, 0]}
          rotation={{ y: middle.node.rotation }}
          size={size}
        />
      ))}
      {end1 && (
        <ChainNode
          chain={chain}
          connection={chain[end1]}
          position={[0, tube.node.length, 0]}
          rotation={{ x: 180, y: chain[end1]?.node?.rotation || 0 }}
          size={size}
        />
      )}
      {end2 && (
        <ChainNode
          chain={chain}
          connection={chain[end2]}
          position={[0, 0, 0]}
          rotation={{ x: 0, y: chain[end2]?.node?.rotation || 0 }}
          size={size}
        />
      )}
    </group>
  );
}

const ChainNode = ({ chain, connection, size, position, rotation }) => {
  const groupRef = React.useRef()
  useRotate(groupRef, rotation)
  const selectedNodeId = useSelectionStore((state) => state.selectedNodeId)

  const { Node } = getTypeDefinition(connection.node.type)

  const [endConnectionPositions, setEndConnectionPositions] = React.useState({})
  const [middleConnectionPositions, setMiddleConnectionPositions] = React.useState({})
  const [endConnectionRotations, setEndConnectionRotations] = React.useState({})
  const [middleConnectionRotations, setMiddleConnectionRotations] = React.useState({})

  const setEndConnectionPosition = (index, _position) => setEndConnectionPositions(old => ({
    ...old,
    [index]: _position,
  }))
  const setMiddleConnectionPosition = (index, _position) => setMiddleConnectionPositions(old => ({
    ...old,
    [index]: _position,
  }))
  const setEndConnectionRotation = (index, _rotation) => setEndConnectionRotations(old => ({
    ...old,
    [index]: _rotation,
  }))
  const setMiddleConnectionRotation = (index, _rotation) => setMiddleConnectionRotations(old => ({
    ...old,
    [index]: _rotation,
  }))

  return (
    <group ref={groupRef} position={position}>
      <Select enabled={connection.id === selectedNodeId}>
        <Node
          id={connection.id}
          connection={connection.node}
          parentConnection={chain[connection.parent]}
          connectionSlot={connection.parentSlot}
          middleConnections={connection.children.middle
            ?.filter(id => id !== connection.parent)
            .map(id => chain[id]) || []}
          endConnections={connection.children.end
            ?.filter(id => id !== connection.parent)
            .map(id => chain[id]) || []}
          size={size}
          setEndConnectionPosition={setEndConnectionPosition}
          setMiddleConnectionPosition={setMiddleConnectionPosition}
          setEndConnectionRotation={setEndConnectionRotation}
          setMiddleConnectionRotation={setMiddleConnectionRotation}
        />
      </Select>
      {connection.children.end
        ?.filter(id => id !== connection.parent)
        .map((id) => chain[id]).map((end, index) => (
          <TubeNode
            chain={chain}
            key={end.id}
            position={endConnectionPositions[index] || position}
            rotation={endConnectionRotations[index] || rotation}
            size={size}
            tube={end}
          />
        ))}
      {connection.children.middle
        ?.filter(id => id !== connection.parent)
        .map((id) => chain[id]).map((middle, index) => (
          <TubeNode
            chain={chain}
            key={middle.id}
            position={middleConnectionPositions[index] || position}
            rotation={middleConnectionRotations[index] || rotation}
            size={size}
            tube={middle}
          />
        ))}
    </group>
  )
}

export default function Chain ({ chain, scene }) {
  const firstNode = Object.values(chain).find((node) => !node.parent);
  const [connection] = firstNode.node.surfaceConnections; // Just take the first surface for now

  let position;
  let rotation;
  const [x, y] = connection.coords;
  if (connection.surface === 'floor') {
    position = [x, 0, y];
    rotation = { x: 0, y: 0, z: 0 };
  } else if (connection.surface === 'side-wall') {
    position = [0, y, scene.length - x];
    rotation = { x: 0, y: 0, z: 270 };
  } else if (connection.surface === 'back-wall') {
    position = [x, y, 0];
    rotation = { x: 90, y: 0, z: 0 };
  } else if (connection.surface === 'side-wall2') {
    position = [scene.width, y, x];
    rotation = { x: 0, y: 0, z: 90 };
  } else if (connection.surface === 'back-wall2') {
    position = [scene.width - x, y, scene.length];
    rotation = { x: 270, y: 0, z: 0 };
  }

  const groupRef = React.useRef()
  useRotate(groupRef, rotation)

  return (
    <group ref={groupRef} position={position}>
      <ChainNode
        chain={chain}
        connection={firstNode}
        size={B}
        position={[0, 0, 0]}
        rotation={{ x: 0, y: 0, z: 0 }}
      />
    </group>
  )
}
