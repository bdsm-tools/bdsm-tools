import React from 'react'
import { Outline } from '@react-three/postprocessing'

export default function HighlightSelected () {
  return (
    <Outline
      edgeStrength={100}
      pulseSpeed={0.0}
      visibleEdgeColor={0xffffff}
      hiddenEdgeColor={0x22090a}
      blur={true}
      xRay
    />
  )
}