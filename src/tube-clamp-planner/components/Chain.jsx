import React from "react";
import {getTypeDefinition} from "../connectors/types";
import {B} from "../sizes";
import Tube from "../nodes/Tube";
import useRotate from '../controls/useRotate'

const TubeNode = ({ tube, position, size, rotation }) => {
    const groupRef = React.useRef();
    useRotate(groupRef, rotation);

    return (
        <group ref={groupRef} position={position}>
            <Tube
                length={tube.length}
                size={size}
            />
            {tube.middleConnections?.map((middle, index) => (
                <ChainNode
                    key={middle.key || index}
                    connection={middle}
                    position={[0, middle.position, 0]}
                    rotation={{ y: middle.rotation }}
                    size={size}
                />
            ))}
            {tube.startConnection && (
                <ChainNode
                    connection={tube.startConnection}
                    position={[0, 0, 0]}
                    rotation={{ x: 0 }}
                    size={size}
                />
            )}
            {tube.endConnection && (
                <ChainNode
                    connection={tube.endConnection}
                    position={[0, tube.length, 0]}
                    rotation={{ x: 180 }}
                    size={size}
                />
            )}
        </group>
    )
};

const ChainNode = ({ connection, size, position, rotation }) => {
    const groupRef = React.useRef();
    useRotate(groupRef, rotation);

    const { Node } = getTypeDefinition(connection.type);

    const [endConnectionPositions, setEndConnectionPositions] = React.useState({});
    const [middleConnectionPositions, setMiddleConnectionPositions] = React.useState({});
    const [endConnectionRotations, setEndConnectionRotations] = React.useState({});
    const [middleConnectionRotations, setMiddleConnectionRotations] = React.useState({});

    const setEndConnectionPosition = (index, _position) => setEndConnectionPositions(old => ({
        ...old,
        [index]: _position,
    }));
    const setMiddleConnectionPosition = (index, _position) => setMiddleConnectionPositions(old => ({
        ...old,
        [index]: _position,
    }));
    const setEndConnectionRotation = (index, _rotation) => setEndConnectionRotations(old => ({
        ...old,
        [index]: _rotation,
    }));
    const setMiddleConnectionRotation = (index, _rotation) => setMiddleConnectionRotations(old => ({
        ...old,
        [index]: _rotation,
    }));

    return (
        <group ref={groupRef} position={position}>
            <Node
                connection={connection}
                size={size}
                setEndConnectionPosition={setEndConnectionPosition}
                setMiddleConnectionPosition={setMiddleConnectionPosition}
                setEndConnectionRotation={setEndConnectionRotation}
                setMiddleConnectionRotation={setMiddleConnectionRotation}
            />
            {connection.endConnections?.map((end, index) => (
                <TubeNode
                    key={end.key || index}
                    position={endConnectionPositions[index] || position}
                    rotation={endConnectionRotations[index] || rotation}
                    size={size}
                    tube={end}
                />
            ))}
            {connection.middleConnections?.map((middle, index) => (
                <TubeNode
                    key={middle.key || index}
                    position={middleConnectionPositions[index] || position}
                    rotation={middleConnectionRotations[index] || rotation}
                    size={size}
                    tube={middle}
                />
            ))}
        </group>
    )
};

export default function Chain({ chain }) {
    const [connection] = chain.surfaceConnections; // Just take the first surface for now

    let position;
    let rotation;
    const [x, y] = connection.coords;
    if (connection.surface === 'floor') {
        position = [x, 0, y];
        rotation = { x: 0, y: 0, z: 0 };
    } else if (connection.surface === 'side-wall') {
        position = [0, y, x];
        rotation = { x: 0, y: 0, z: 270 };
    } else if (connection.surface === 'back-wall') {
        position = [x, y, 0];
        rotation = { x: 90, y: 0, z: 0 };
    }

    const groupRef = React.useRef();
    useRotate(groupRef, rotation);

    return (
      <group ref={groupRef} position={position}>
        <ChainNode
            connection={chain}
            size={B}
            position={[0,0,0]}
            rotation={{x:0,y:0,z:0}}
        />
      </group>
    );
}
