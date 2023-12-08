/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { memo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import vs from "@v3/site/shaders/skydom/vertex.vs.glsl";
import fs from "@v3/site/shaders/skydom/fragment.fs.glsl";

export const GLSkydom = memo(() => {
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
    <group ref={groupRef} visible={false}>
      <primitive object={mesh.current} />
    </group>
  );
});
