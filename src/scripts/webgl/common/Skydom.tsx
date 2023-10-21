/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import fs from "@Scripts/webgl/shaders/skydom/fragment.fs.glsl";
import vs from "@Scripts/webgl/shaders/skydom/vertex.vs.glsl";

export const Skydom = () => {
  const geometry = useRef<THREE.SphereGeometry>(new THREE.SphereGeometry(800, 32, 32));
  const groupRef = useRef<THREE.Group>(null);

  const material = useRef<THREE.RawShaderMaterial>(
    new THREE.RawShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
      },
      vertexShader: vs,
      fragmentShader: fs,
      side: THREE.BackSide,
    }),
  );

  const mesh = useRef<THREE.Mesh>(new THREE.Mesh(geometry.current, material.current));

  useFrame((_, delta) => {
    (mesh.current.material as THREE.RawShaderMaterial).uniforms["uTime"].value += delta;
  });

  return (
    <group ref={groupRef}>
      <primitive object={mesh.current} />
    </group>
  );
};
