import { MeshProps, useFrame } from "@react-three/fiber";
import { forwardRef, memo, useEffect, useRef } from "react";
import * as THREE from "three";

export type TGLBoundingEffectRef = {};

interface IGLBoundingEffectProps extends MeshProps {
  geometry: THREE.BufferGeometry;
  position: THREE.Vector3;
}

export const GLBoundingEffect = memo(
  forwardRef<TGLBoundingEffectRef, IGLBoundingEffectProps>(
    ({ geometry, position, ...props }, ref) => {
      const boundingEffectRef = useRef<THREE.Mesh | any>(null);

      const material = useRef<THREE.MeshBasicMaterial>(
        new THREE.MeshBasicMaterial({
          color: new THREE.Color(0x90b3d6),
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 1,
          depthWrite: false,
          depthTest: true,
        }),
      );

      const effectUniform = useRef({
        uTime: { value: 0 },
        uAlpha: { value: 1 },
      });

      useEffect(() => {
        material.current.onBeforeCompile = (shader: any) => {
          shader.uniforms.uTime = effectUniform.current.uTime;
          shader.uniforms.uAlpha = effectUniform.current.uAlpha;
          shader.fragmentShader = `
        uniform float uTime;
        uniform float uAlpha;
        ${shader.fragmentShader}`.replace(
            `#include <color_fragment>`,
            `#include <color_fragment>
        float t = uTime;
        float waveLength = 0.5;
        float pulseSpeed = 0.5;
        float fallSpeed = -0.5;
        float mainWave = tan((vUv.x + t * fallSpeed) * waveLength * PI2) * 0.1 + 0.9;
        mainWave = mainWave * 0.5 + 0.2;
        mainWave *= (sin(t * PI2 * 1.) * pulseSpeed + 0.5) * 0.25 + 0.75;
        float fadeOut = pow(vUv.x, 2.2);
        
        float a = 0.;
        a = max(a, mainWave);
        
        diffuseColor.a = a * fadeOut * uAlpha;
      `,
          );
        };
        material.current.defines = { USE_UV: "" };
      }, []);

      useFrame(({ clock }) => {
        effectUniform.current.uTime.value = clock.getElapsedTime();
      });

      return (
        <mesh
          ref={boundingEffectRef}
          castShadow={false}
          receiveShadow={false}
          position={position}
          geometry={geometry}
          material={material.current}
          scale={[1, 1, 1]}
          renderOrder={1000}
          {...props}
        />
      );
    },
  ),
);
