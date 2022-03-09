import React from "react";
import {Math, Vector3} from 'three';

// obj - your object (THREE.Object3D or derived)
// point - the point of rotation (THREE.Vector3)
// axis - the axis of rotation (normalized THREE.Vector3)
// theta - radian value of rotation
// pointIsWorld - boolean indicating the point is in world coordinates (default = false)
function rotateAboutPoint(obj, point, axis, theta, pointIsWorld){
    pointIsWorld = (pointIsWorld === undefined)? false : pointIsWorld;

    if(pointIsWorld){
        obj.parent.localToWorld(obj.position); // compensate for world coordinate
    }

    obj.position.sub(point); // remove the offset
    obj.position.applyAxisAngle(axis, theta); // rotate the POSITION
    obj.position.add(point); // re-add the offset

    if(pointIsWorld){
        obj.parent.worldToLocal(obj.position); // undo world coordinates compensation
    }

    obj.rotateOnAxis(axis, theta); // rotate the OBJECT
}

export default function useRotate(ref, {x,y,z}) {
    React.useEffect(() => {
        if (ref.current) {

            if (x) {
                ref.current.rotation.x = Math.degToRad(x);
            }
            if (y) {
                ref.current.rotation.y = Math.degToRad(y);
            }
            if (z) {
                ref.current.rotation.z = Math.degToRad(z);
            }

        }
    }, [ref.current]);
}