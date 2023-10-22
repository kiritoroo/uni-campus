import { useFrame } from "@react-three/fiber";
import { forwardRef, memo, useEffect, useImperativeHandle, useMemo, useRef } from "react";
import * as THREE from "three";
import gsap, { Expo } from "gsap";
import { useBuildingStoreProxyInContext } from "../hooks/useBuildingStoreProxyInContext";
import { useSnapshot } from "valtio";

export type TGLBoundingEffectRef = {
  object: THREE.Mesh;
  onPointerEnterBuilding: () => void;
  onPointerLeaveBuilding: () => void;
};

interface IGLBoundingEffectProps {
  geometry: THREE.BufferGeometry;
  position: THREE.Vector3;
}

export const GLBoundingEffect = memo(
  forwardRef<TGLBoundingEffectRef, IGLBoundingEffectProps>(({ geometry, position }, ref) => {
    const buildingStoreProxy = useBuildingStoreProxyInContext();
    const { isPicked } = useSnapshot(buildingStoreProxy);

    const boundingEffectRef = useRef<THREE.Mesh | any>(null);
    const animateTimeline = useMemo(() => {
      return gsap.timeline();
    }, []);

    const material = useRef<THREE.MeshBasicMaterial>(
      new THREE.MeshBasicMaterial({
        color: new THREE.Color(0x365aab),
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0,
        depthWrite: false,
        depthTest: true,
      }),
    );

    const effectUniform = useRef({
      uTime: { value: 0 },
      uAlpha: { value: 0 },
    });

    const handleOnPointerEnterBuilding = () => {
      animateTimeline.clear();
      boundingEffectRef.current &&
        animateTimeline
          .to(
            (boundingEffectRef.current as THREE.Mesh).scale,
            {
              y: 2,
              ease: Expo.easeInOut,
              duration: 0.3,
            },
            "<",
          )
          .to(
            effectUniform.current.uAlpha,
            {
              value: 1,
              ease: Expo.easeInOut,
              duration: 0.3,
            },
            "<",
          )
          .play();
    };

    const handleOnPointerLeaveBuilding = () => {
      animateTimeline.clear();
      boundingEffectRef.current &&
        animateTimeline
          .to(
            (boundingEffectRef.current as THREE.Mesh).scale,
            {
              y: 0,
              ease: Expo.easeInOut,
              duration: 0.3,
            },
            "<",
          )
          .to(
            effectUniform.current.uAlpha,
            {
              value: 0,
              ease: Expo.easeInOut,
              duration: 0.3,
            },
            "<",
          )
          .play();
    };

    useImperativeHandle(ref, () => ({
      object: boundingEffectRef.current,
      onPointerEnterBuilding: handleOnPointerEnterBuilding,
      onPointerLeaveBuilding: handleOnPointerLeaveBuilding,
    }));

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
        float t = -uTime;
        float mainWave = sin((vUv.y - t * 0.2) * 2.5 * PI2) * 0.5 + 0.9;
        mainWave = mainWave * 0.25 + 0.25;
        mainWave *= (sin(t * PI2 * 1.) * 0.5 + 0.5) * 0.25 + 0.75;
        float fadeOut = pow(vUv.y, 2.7);
        
        float a = 0.;
        a = max(a, mainWave);
        
        diffuseColor.a = a * fadeOut * uAlpha;
      `,
        );
      };
      material.current.defines = { USE_UV: "" };
    }, []);

    useEffect(() => {
      if (isPicked) {
        animateTimeline.clear();
        animateTimeline
          .to(
            effectUniform.current.uAlpha,
            {
              value: 0,
              ease: Expo.easeInOut,
              duration: 0.5,
            },
            "<",
          )
          .play();
      }
    }, [isPicked]);

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
        scale={[1, 0, 1]}
        renderOrder={1000}
      />
    );
  }),
);
