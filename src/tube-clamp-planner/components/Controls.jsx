import React from 'react';
import { useFrame } from '@react-three/fiber'
import { update } from "@tweenjs/tween.js";
import useSelectNode from '../controls/useSelectNode'

export default function Controls() {
    useFrame(({ delta }) => update(delta));
    // useSelectNode((selection, node) => {
    //     node?.material?.emissive?.setHex(0xff0000);
    // });

    return null;
}