import React from 'react';
import characterUrl from '../assets/slave.fbx';
import defaultPoseUrl from '../assets/straight.pose.fbx';
import { useFBX } from '@react-three/drei';
import { extend } from '@react-three/fiber';
import { SkeletonHelper } from 'three';

extend({ SkeletonHelper });

export default function SlaveModel({ poseKey, position }) {
  const [poseUrl, setPoseUrl] = React.useState();

  const character = useFBX(characterUrl);
  const pose = useFBX(poseUrl || defaultPoseUrl);

  React.useEffect(() => {
    if (poseKey) {
      import(`../assets/${poseKey}.pose.fbx`)
        .then((data) => setPoseUrl(data))
        .catch((e) => console.error(e));
    }
  }, [poseKey]);

  function applyPose(riggedMesh, poseData) {
    if (!riggedMesh || !poseData) return;

    const riggedBones = {};
    riggedMesh.traverse((child) => {
      if (child.isBone) riggedBones[child.name] = child;
    });

    poseData.traverse((child) => {
      if (child.isBone && riggedBones[child.name]) {
        const targetBone = riggedBones[child.name];
        targetBone.position.add(child.position);
        targetBone.quaternion.copy(child.quaternion);
      }
    });

    riggedMesh.updateMatrixWorld(true);
  }

  React.useEffect(() => {
    if (character && pose) {
      applyPose(character, pose);
    }
  }, [character, pose]);

  React.useEffect(() => {
    const characterBones = {};

    // Map character bones by name
    character.traverse((child) => {
      if (child.isBone) {
        characterBones[child.name] = child;
      }
    });

    // Traverse pose bones and apply their transformations
    pose.traverse((child) => {
      if (child.isBone && characterBones[child.name]) {
        const targetBone = characterBones[child.name];
        targetBone.position.copy(child.position);
        targetBone.rotation.copy(child.rotation);
      }
    });
  }, [character, pose]);

  return (
    <group position={position} scale={[100, 100, 100]}>
      <primitive object={character} />
      {/*<primitive object={new SkeletonHelper(pose)}/>*/}
    </group>
  );
}
