import React from 'react';
import { useFrame } from '@react-three/fiber';
import { update } from '@tweenjs/tween.js';

export default function Controls() {
  useFrame(({ delta }) => update(delta));

  return null;
}
