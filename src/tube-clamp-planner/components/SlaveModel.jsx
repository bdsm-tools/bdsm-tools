import React from 'react';
// import characterUrl from '../assets/slave.glb';
// import character2Url from '../assets/slave.fbx';
import defaultPoseUrl from '../assets/default.pose.fbx';
import { useFBX, useGLTF } from '@react-three/drei';
import { extend } from '@react-three/fiber';
import { SkeletonHelper } from 'three';

extend({ SkeletonHelper });
// useGLTF.preload("../assets/slave.glb");

export default function SlaveModel({ poseKey, position }) {
  const [poseUrl, setPoseUrl] = React.useState();

  const character = null;
  // const { scene: character } = useGLTF(characterUrl);
  // const character2 = useFBX(character2Url);
  const pose = useFBX(poseUrl || defaultPoseUrl);

  React.useEffect(() => {
    if (poseKey) {
      import(`../assets/${poseKey}.pose.fbx`)
        .then((data) => setPoseUrl(data.default))
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
        targetBone.position.set(child.position);
        targetBone.quaternion.copy(child.quaternion);
      }
    });

    riggedMesh.updateMatrixWorld(true);
  }

  React.useEffect(() => {
    if (character) {
      character.traverse((obj) => {
        if (obj.isMesh) {
          obj.material.depthTest = true; // Ensures proper occlusion
          obj.material.depthWrite = true; // Writes depth buffer info
          if (obj.material.transparent) {
            obj.material.transparent = false; // Ensures correct depth sorting
          }
        }
      });
    }
    // if (character && pose) {
    //   applyPose(character, pose);
    // }
  }, [character, pose]);

  // React.useEffect(() => {
  //   const characterBones = {};
  //
  //   // Map character bones by name
  //   character.traverse((child) => {
  //     if (child.isBone) {
  //       characterBones[child.name] = child;
  //     }
  //   });
  //
  //   // Traverse pose bones and apply their transformations
  //   pose.traverse((child) => {
  //     if (child.isBone && characterBones[child.name]) {
  //       const targetBone = characterBones[child.name];
  //       targetBone.position.copy(child.position);
  //       targetBone.rotation.copy(child.rotation);
  //     }
  //   });
  // }, [character, pose]);

  return (
    <group position={position}>
      <group scale={[100, 100, 100]}>
        {!!character && <primitive object={character} />}
      </group>
      {/*<group position={[100, 0, 10]}>*/}
      {/*  <primitive object={character2} />*/}
      {/*</group>*/}
    </group>
  );
}
