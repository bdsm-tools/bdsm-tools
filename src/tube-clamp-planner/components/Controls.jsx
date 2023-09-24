import React from 'react';
import { Vector3} from "three";
import {useFrame, useThree} from "@react-three/fiber";
import { update } from "@tweenjs/tween.js";


export default function Controls() {
    const { camera } = useThree();

    useFrame(({ delta }) => update(delta));

    React.useEffect(() => {
        camera.position.x = 100;
        camera.position.y = 200;
        camera.position.z = 100;

        camera.lookAt(new Vector3(0, 0, 0))
    }, []);

    return null;
}