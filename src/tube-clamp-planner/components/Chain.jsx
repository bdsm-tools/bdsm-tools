import React from "react";
import {getTypeDefinition} from "../connectors/types";
import {B} from "../sizes";
import Tube from "../nodes/Tube";

const TubeNode = ({ tube, position, size, rotation }) => {
    const [x,y,z] = position;

    const [endPosition] = React.useState([x, y + (tube.endConnection?.position || 0), z]);
    const [middleConnectionPositions, setMiddleConnectionPositions] = React.useState({});

    const setMiddleConnectionPosition = (index, position) => setMiddleConnectionPositions(old => ({
        ...old,
        [index]: position,
    }));
    return (
        <>
            <Tube
                length={tube.length}
                position={position}
                rotation={rotation}
                size={size}
                setMiddleConnectionPosition={setMiddleConnectionPosition}
            />
            {tube.middleConnections?.map((middle, index) => (
                <ChainNode
                    key={position.toString()}
                    connection={middle}
                    position={middleConnectionPositions[index] || [x, y + (middle.position || 0), z]}
                    rotation={rotation}
                    size={size}
                />
            ))}
            {tube.endConnection && (
                <ChainNode
                    key={position.toString()}
                    connection={tube.endConnection}
                    position={endPosition}
                    rotation={rotation}
                    size={size}
                />
            )}
        </>
    )
};

const ChainNode = ({ connection, position, size, rotation }) => {
    const { Node } = getTypeDefinition(connection.type);

    const [endConnectionPositions, setEndConnectionPositions] = React.useState({});
    const [middleConnectionPositions, setMiddleConnectionPositions] = React.useState({});

    const setEndConnectionPosition = (index, position) => setEndConnectionPositions(old => ({
        ...old,
        [index]: position,
    }));
    const setMiddleConnectionPosition = (index, position) => setMiddleConnectionPositions(old => ({
        ...old,
        [index]: position,
    }));

    return (
        <>
            <Node
                connection={connection}
                position={position}
                rotation={rotation}
                size={size}
                setEndConnectionPosition={setEndConnectionPosition}
                setMiddleConnectionPosition={setMiddleConnectionPosition}
            />
            {connection.endConnections?.map((end, index) => (
                <TubeNode
                    key={position.toString()}
                    position={endConnectionPositions[index] || [0,0,0]}
                    rotation={rotation}
                    size={size}
                    tube={end}
                />
            ))}
            {connection.middleConnections?.map((middle, index) => (
                <TubeNode
                    key={position.toString()}
                    position={middleConnectionPositions[index] || [0,0,0]}
                    rotation={rotation}
                    size={size}
                    tube={middle}
                />
            ))}
        </>
    )
};

export default function Chain({ chain }) {
    const [connection] = chain.surfaceConnections; // Just take the first surface for now

    let position;
    const [x, y] = connection.coords;
    if (connection.surface === 'floor') {
        position = [x, 0, y];
    } else if (connection.surface === 'side-wall') {
        position = [0, y, x];
    } else if (connection.surface === 'back-wall') {
        position = [x, y, 0];
    }
    return (
        <ChainNode
            connection={chain}
            position={position}
            size={B}
            rotation={{ x: 0, y: 0, z: 0 }}
        />
    );
}
