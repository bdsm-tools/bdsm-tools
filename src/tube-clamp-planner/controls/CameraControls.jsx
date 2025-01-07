import React from 'react';
import useSceneStore from '../state/useSceneStore';
import { P, Text } from '../../components/Text';

export default function CameraControls({}) {
  const { canvasData } = useSceneStore();

  const canvasCameraPosition = canvasData?.camera?.position;
  const canvasCameraRotation = canvasData?.camera?.rotation;
  const canvasCameraFocusPoint = canvasData?.camera?.focusPoint;

  return (
    <>
      <P className='flex' style={{ flexDirection: 'column' }}>
        <b>Position:</b>
        <Text>x: {canvasCameraPosition?.x}</Text>
        <Text>y: {canvasCameraPosition?.y}</Text>
        <Text>z: {canvasCameraPosition?.z}</Text>
      </P>
      <P className='flex' style={{ flexDirection: 'column' }}>
        <b>Rotation (Radians):</b>
        <Text>x: {canvasCameraRotation?.x}</Text>
        <Text>y: {canvasCameraRotation?.y}</Text>
        <Text>z: {canvasCameraRotation?.z}</Text>
      </P>
      <P className='flex' style={{ flexDirection: 'column' }}>
        <b>Focus Point:</b>
        <Text>x: {canvasCameraFocusPoint?.x}</Text>
        <Text>y: {canvasCameraFocusPoint?.y}</Text>
        <Text>z: {canvasCameraFocusPoint?.z}</Text>
      </P>
    </>
  );
}
