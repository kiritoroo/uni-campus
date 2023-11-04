import * as THREE from "three";

export type TGLTFReference = {
  animations: Array<THREE.AnimationClip>;
  asset: Object;
  cameras: Array<THREE.Camera>;
  scene: THREE.Group;
  scenes: Array<THREE.Group>;
  materials: Object;
  nodes: Object;
};
