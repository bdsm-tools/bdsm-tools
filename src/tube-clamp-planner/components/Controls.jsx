import React, {useEffect} from 'react';
import { Vector3} from "three";
import {useFrame, useThree} from "@react-three/fiber";
import {useKeyPress} from "ahooks";
import { update } from "@tweenjs/tween.js";


export default function Controls() {
    const { camera } = useThree();

    useKeyPress('uparrow', () => {
        camera.translateZ(-.5);
        // camera.lookAt(new Vector3(0, 0, 0))
    });
    useKeyPress('downarrow', () => {
        camera.translateZ(.5);
        // camera.lookAt(new Vector3(0, 0, 0))
    });
    useKeyPress('leftarrow', () => {
        camera.translateX(-.5);
        // camera.lookAt(new Vector3(0, 0, 0))
    });
    useKeyPress('rightarrow', () => {
        camera.translateX(.5);
        // camera.lookAt(new Vector3(0, 0, 0))
    });

    useFrame(({ delta }) => update(delta));

    React.useEffect(() => {
        camera.position.x = 0;
        camera.position.y = 100;
        camera.position.z = 100;

        camera.lookAt(new Vector3(0, 0, 0))
    }, []);

    return null;
}