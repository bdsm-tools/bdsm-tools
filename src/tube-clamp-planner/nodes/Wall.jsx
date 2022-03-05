import React from "react";

export default function Wall() {
    const ref = React.useRef();

    return (
        <mesh ref={ref} position={[-50, 0, 0]}>
            <boxGeometry args={[5, 100, 100]} />
            <meshStandardMaterial color='white' />
        </mesh>
    );
}