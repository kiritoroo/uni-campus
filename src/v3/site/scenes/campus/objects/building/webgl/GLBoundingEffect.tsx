import { MeshProps, useFrame } from "@react-three/fiber";
import { memo, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useCampusSceneStore } from "../../../hooks/useCampuseSceneStore";
import gsap, { Expo } from "gsap";
import { useBuildingStore } from "../hooks/useBuildingStore";
import { useCampusStore } from "../../campus/hooks/useCampusStore";

interface GLBoundingEffectProps extends MeshProps {
  property: {
    geometry: THREE.BufferGeometry;
    position: THREE.Vector3;
  };
}

const GlBoundingEffect = memo(({ property }: GLBoundingEffectProps) => {
  const campusSceneStore = useCampusSceneStore();
  const campusStore = useCampusStore();
  const buildingStore = useBuildingStore();

  const campusMode = campusSceneStore.use.campusMode();
  const buildingPicked = campusStore.use.buildingPicked();
  const isPointerEnterBuildingNearest = buildingStore.use.isPointerEnterBuildingNearest();
  const isBuildingPicked = buildingStore.use.isBuildingPicked();

  const boundingEffectRef = useRef<THREE.Mesh | any>(null);
  const animateTimeline = useMemo(() => {
    return gsap.timeline();
  }, []);

  const material = useRef<THREE.MeshBasicMaterial>(
    new THREE.MeshBasicMaterial({
      color: new THREE.Color(0.21, 0.35, 0.67),
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

  const handleOnPointerEnterBuildingNearest = () => {
    animateTimeline.clear();
    boundingEffectRef.current &&
      animateTimeline
        .to(
          (boundingEffectRef.current as THREE.Mesh).scale,
          {
            y: 1,
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

  const handleOnPointerLeaveBuildingNearest = () => {
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

  // Animate on pointer enter nearest
  useEffect(() => {
    if (isPointerEnterBuildingNearest) {
      handleOnPointerEnterBuildingNearest();
    }

    if (!isPointerEnterBuildingNearest) {
      handleOnPointerLeaveBuildingNearest();
    }
  }, [isPointerEnterBuildingNearest]);

  // Animate on picked
  useEffect(() => {
    if (!buildingPicked) return;

    if (isBuildingPicked) {
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
  }, [isBuildingPicked]);

  useFrame(({ clock }) => {
    effectUniform.current.uTime.value = clock.getElapsedTime();
  });

  return (
    <mesh
      ref={boundingEffectRef}
      castShadow={false}
      receiveShadow={false}
      geometry={property.geometry}
      position={property.position}
      material={material.current}
      scale={[1, 0, 1]}
      renderOrder={1000}
      visible={true}
    />
  );
});

export default GlBoundingEffect;
