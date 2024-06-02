import React from "react";
import {useFrame, useThree} from "@react-three/fiber";
import { OrbitControls, useSelect } from '@react-three/drei'
import { Vector3 } from 'three'
import useKeyDown from '../../hooks/customHooks'
import useFocusPoint from '../controls/useFocusPoint'

export default function CameraControls() {
    const { camera, gl: { domElement } } = useThree();
    const controls = React.useRef();
    const [focusPoint, setFocusPoint] = useFocusPoint();

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
                cameraRight.crossVectors(cameraDirection, new Vector3(0, 1, 0)).normalize();

                return cameraRight.multiplyScalar(speed * ('right' === direction ? 1 : -1))
            } else if (direction === 'forward') {
                return cameraDirection.multiplyScalar(speed)
            } else if (direction === 'backward') {
                return cameraDirection.multiplyScalar(-speed)
            } else if (direction === 'up') {
                return new Vector3(0, speed, 0);
            } else if (direction === 'down') {
                return new Vector3(0, -speed, 0);
            } else {
                throw 'Unknown direction: ' + direction;
            }
        })();

        camera.position.add(moveAmount);
        if (!rotate) setFocusPoint(old => old.add(moveAmount));
    }

    React.useEffect(() => {
        camera.position.x = 100;
        camera.position.y = 100;
        camera.position.z = 100;
        camera.up = new Vector3(0, 1, 0);
    }, []);

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
        camera.lookAt(focusPoint);

        const speed = 1.6;
        const modifier = (e) => e.shiftKey ? 4 : e.ctrlKey ? .25 : 1;
        if ((forward && !forward.altKey) || (forward2 && !forward2.altKey)) moveCamera(speed * modifier(forward || forward2), 'forward');
        else if ((forward && forward.altKey) || (forward2 && forward2.altKey)) moveCamera(speed * modifier(forward || forward2), 'up');
        if ((back && !back.altKey) || (back2 && !back2.altKey)) moveCamera(speed * modifier(back || back2), 'backward');
        else if ((back && back.altKey) || (back2 && back2.altKey)) moveCamera(speed * modifier(back || back2), 'down');
        if (right || right2) moveCamera(speed * modifier(right || right2), 'right');
        if (left || left2) moveCamera(speed * modifier(left || left2), 'left');
        if (orbitRight && !orbitRight.altKey) moveCamera(speed * modifier(orbitRight), 'right', true);
        else if (orbitRight && orbitRight.altKey) moveCamera(speed * modifier(orbitRight), 'up', true);
        if (orbitLeft && !orbitLeft.altKey) moveCamera(speed * modifier(orbitLeft), 'left', true);
        else if (orbitLeft && orbitLeft.altKey) moveCamera(speed * modifier(orbitLeft), 'down', true);
        if (zoomIn) zoomCamera(speed * modifier(zoomIn));
        if (zoomOut) zoomCamera(-speed * modifier(zoomOut));

        // controls.current.update();
    });

    return (
      <>
          <mesh position={focusPoint.toArray([])}>
              <sphereGeometry args={[1, 32, 32]}/>
              <meshBasicMaterial color={0xff0000} />
          </mesh>
          {/*<OrbitControls*/}
          {/*  ref={controls}*/}
          {/*  camera={camera}*/}
          {/*  domElement={domElement}*/}
          {/*  target={focusPoint}*/}
          {/*  listenToKeyEvents={window}*/}
          {/*  enableDamping*/}
          {/*  makeDefault*/}
          {/*/>*/}
      </>
    );
}