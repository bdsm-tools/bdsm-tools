import React from 'react';
import { MathUtils } from 'three';

// obj - your object (THREE.Object3D or derived)
// point - the point of rotation (THREE.Vector3)
// axis - the axis of rotation (normalized THREE.Vector3)
// theta - radian value of rotation
// pointIsWorld - boolean indicating the point is in world coordinates (default = false)
// eslint-disable-next-line no-unused-vars
function rotateAboutPoint(obj, point, axis, theta, pointIsWorld) {
  pointIsWorld = pointIsWorld === undefined ? false : pointIsWorld;

  if (pointIsWorld) {
    obj.parent.localToWorld(obj.position); // compensate for world coordinate
  }

  obj.position.sub(point); // remove the offset
  obj.position.applyAxisAngle(axis, theta); // rotate the POSITION
  obj.position.add(point); // re-add the offset

  if (pointIsWorld) {
    obj.parent.worldToLocal(obj.position); // undo world coordinates compensation
  }

  obj.rotateOnAxis(axis, theta); // rotate the OBJECT
}

export default function useRotate(
  ref,
  { x = 0, y = 0, z = 0 },
  condition = () => true,
) {
  React.useEffect(() => {
    if (ref.current && condition()) {
      if (x > -1) {
        ref.current.rotation.x = MathUtils.degToRad(x % 360);
      }
      if (y > -1) {
        ref.current.rotation.y = MathUtils.degToRad(y % 360);
      }
      if (z > -1) {
        ref.current.rotation.z = MathUtils.degToRad(z % 360);
      }
    }
  }, [ref.current, x, y, z, condition]);
}
