import React from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useSelect } from '@react-three/drei';
import { Vector3 } from 'three';
import useKeyDown from '../../hooks/customHooks';
import useFocusPoint from '../controls/useFocusPoint';
import { useInterval } from 'ahooks';
import useSceneStore from '../state/useSceneStore';
import useSelectionStore from '../state/useSelectionStore';

export default function CameraControls() {
  const {
    camera,
    gl: { domElement },
  } = useThree();
  const [focusPoint, setFocusPoint] = useFocusPoint();
  const { selection } = useSelectionStore();

  const { scene, setCanvasData } = useSceneStore();

  function zoomCamera(speed) {
    const direction = camera.getWorldDirection(new Vector3());

    camera.position.add(direction.multiplyScalar(speed / 2));
  }

  function moveCamera(speed, direction, rotate = false) {
    const cameraDirection = camera.getWorldDirection(new Vector3());
    cameraDirection.setY(0);

    const moveAmount = (() => {
      if (['right', 'left'].includes(direction)) {
        const cameraRight = new Vector3();
        cameraRight
          .crossVectors(cameraDirection, new Vector3(0, 1, 0))
          .normalize();

        return cameraRight.multiplyScalar(
          speed * ('right' === direction ? 1 : -1),
        );
      } else if (direction === 'forward') {
        return cameraDirection.multiplyScalar(speed);
      } else if (direction === 'backward') {
        return cameraDirection.multiplyScalar(-speed);
      } else if (direction === 'up') {
        // return cameraDirection.multiplyScalar(speed).add(new Vector3(0, -speed, 0));
        return new Vector3(0, speed, 0);
      } else if (direction === 'down') {
        // return cameraDirection.multiplyScalar(speed).add(new Vector3(0, speed, 0));
        return new Vector3(0, -speed, 0);
      } else {
        throw 'Unknown direction: ' + direction;
      }
    })();

    camera.position.add(moveAmount);
    if (!rotate) setFocusPoint((old) => old.add(moveAmount));
  }

  React.useEffect(() => {
    camera.position.x = scene?.camera?.position?.x || 100;
    camera.position.y = scene?.camera?.position?.y || 100;
    camera.position.z = scene?.camera?.position?.z || 150;
    camera.up = scene?.camera?.up || new Vector3(0, 1, 0);

    if (scene?.camera?.focusPoint) {
      setFocusPoint(
        new Vector3(
          scene?.camera?.focusPoint.x,
          scene?.camera?.focusPoint.y,
          scene?.camera?.focusPoint.z,
        ),
      );
    }
  }, [scene.id]);

  React.useEffect(() => {
    setCanvasData({
      domElement,
      camera: {
        canvasCamera: camera,
        focusPoint: {
          x: focusPoint.x,
          y: focusPoint.y,
          z: focusPoint.z,
        },
      },
    });
  }, [focusPoint, camera, domElement]);

  React.useEffect(() => {
    if (selection?.userData.cameraPositionOnFocus) {
      camera.position.set(...selection?.userData.cameraPositionOnFocus);
    }
  }, [selection]);

  const forward = useKeyDown('w');
  const forward2 = useKeyDown('upArrow');
  const left = useKeyDown('a');
  const left2 = useKeyDown('leftArrow');
  const back = useKeyDown('s');
  const back2 = useKeyDown('downArrow');
  const right = useKeyDown('d');
  const right2 = useKeyDown('rightArrow');
  const orbitLeft = useKeyDown('q');
  const orbitRight = useKeyDown('e');
  const zoomIn = useKeyDown(187);
  const zoomOut = useKeyDown(189);

  useFrame(() => {
    const distanceToFocusPoint = camera.position.clone().sub(focusPoint); // WIP
    camera.lookAt(focusPoint);

    const speed = 1.6;
    const modifier = (e) => (e.shiftKey ? 4 : e.ctrlKey ? 0.25 : 1);
    if ((forward && !forward.altKey) || (forward2 && !forward2.altKey))
      moveCamera(speed * modifier(forward || forward2), 'forward');
    else if ((forward && forward.altKey) || (forward2 && forward2.altKey))
      moveCamera(speed * modifier(forward || forward2), 'up');
    if ((back && !back.altKey) || (back2 && !back2.altKey))
      moveCamera(speed * modifier(back || back2), 'backward');
    else if ((back && back.altKey) || (back2 && back2.altKey))
      moveCamera(speed * modifier(back || back2), 'down');
    if (right || right2) moveCamera(speed * modifier(right || right2), 'right');
    if (left || left2) moveCamera(speed * modifier(left || left2), 'left');
    if (orbitRight && !orbitRight.altKey)
      moveCamera(speed * modifier(orbitRight), 'right', true);
    else if (orbitRight && orbitRight.altKey)
      moveCamera(speed * modifier(orbitRight), 'up', true);
    if (orbitLeft && !orbitLeft.altKey)
      moveCamera(speed * modifier(orbitLeft), 'left', true);
    else if (orbitLeft && orbitLeft.altKey)
      moveCamera(speed * modifier(orbitLeft), 'down', true);
    if (zoomIn) zoomCamera(speed * modifier(zoomIn));
    if (zoomOut) zoomCamera(-speed * modifier(zoomOut));

    // controls.current.update();
    camera.updateProjectionMatrix();
  });

  if (!scene.visuliseFocusPoint) return null;
  return (
    <>
      <mesh position={focusPoint.toArray([])}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial color={0xff0000} />
      </mesh>
    </>
  );
}
