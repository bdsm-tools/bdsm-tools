import React from "react";

export default function Floor() {
    const ref = React.useRef();

    return (
        <mesh ref={ref} position={[0, -50, 0]}>
            <boxGeometry args={[100, 5, 100]} />
            <meshStandardMaterial color='brown' />
        </mesh>
    );
}