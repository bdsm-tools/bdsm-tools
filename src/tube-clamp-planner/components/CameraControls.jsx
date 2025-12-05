import React from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Box3, Vector3 } from 'three';
import useKeyDown from '../../hooks/useKeyDown';
import useSceneStore from '../state/useSceneStore';
import useSelectionStore from '../state/useSelectionStore';

export default function CameraControls() {
  const {
    camera,
    gl: { domElement },
  } = useThree();
  const { scene, setCanvasData } = useSceneStore();
  const { selection } = useSelectionStore();

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
        return new Vector3(0, speed, 0);
      } else if (direction === 'down') {
        return new Vector3(0, -speed, 0);
      } else {
        throw 'Unknown direction: ' + direction;
      }
    })();

    camera.position.add(moveAmount);
    if (!rotate) camera.focusPoint.add(moveAmount);
  }

  React.useEffect(() => {
    camera.position.x = scene?.camera?.position?.x || 100;
    camera.position.y = scene?.camera?.position?.y || 100;
    camera.position.z = scene?.camera?.position?.z || 150;
    camera.up = scene?.camera?.up || new Vector3(0, 1, 0);
    camera.rotation.set(
      scene?.camera?.rotation?.x || 1,
      scene?.camera?.rotation?.y || 0,
      scene?.camera?.rotation?.z || 0,
    );
    camera.focusPoint = new Vector3(
      scene?.camera?.focusPoint?.x || 50,
      scene?.camera?.focusPoint?.y || 50,
      scene?.camera?.focusPoint?.z || 50,
    );

    camera.far = 10000;

    camera.updateProjectionMatrix();
  }, [scene.id]);

  React.useEffect(() => {
    setCanvasData({
      domElement,
      camera,
    });
  }, [camera, domElement]);

  React.useEffect(() => {
    if (selection) {
      camera.focusPoint = new Box3()
        .setFromObject(selection)
        .getCenter(new Vector3());

      if (selection.userData?.cameraPositionOnFocus) {
        camera.position.set(...selection?.userData.cameraPositionOnFocus);
      }
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
    // const distanceToFocusPoint = camera.position.clone().sub(camera.focusPoint || new Vector3()); // WIP
    if (camera.focusPoint) camera.lookAt(camera.focusPoint);

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

    camera.updateProjectionMatrix();
  });

  if (!scene.visuliseFocusPoint) return null;
  return (
    <>
      <mesh position={camera.focusPoint.toArray([])}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial color={0xff0000} />
      </mesh>
    </>
  );
}
