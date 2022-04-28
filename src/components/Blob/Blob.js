import React, { useRef, useEffect, forwardRef } from "react";
import { useFrame } from "@react-three/fiber";
import { vertexShader, fragmentShader } from "./shaders";
import * as THREE from "three"

export default Blob = forwardRef(({  size,
    speed,
    color,
    density,
    strength,
    offset,
    position,
    rotation,}, ref) => {

  const clock = new THREE.Clock();
  const material = useRef();

  const uniforms = {
    uTime: { value: 0 },
    uSpeed: { value: speed },
    uNoiseDensity: { value: density },
    uNoiseStrength: { value: strength },
    uFreq: { value: 3 },
    uAmp: { value: 6 },
    uHue: { value: color },
    uOffset: { value: offset },
    red: { value: 0 },
    green: { value: 0 },
    blue: { value: 0 },
    uAlpha: { value: 1.0 },
  };

  useFrame(() => {
    material.current.uniforms.uTime.value = clock.getElapsedTime();
  });

  return (
    <mesh ref={ref} position={position} rotateOnAxis={rotation}>
      <icosahedronBufferGeometry attach="geometry" args={[size, 64]} />
      <shaderMaterial
        needsUpdate={true}
        attach="material"
        ref={material}
        uniforms={uniforms}
        // Feed the shaders as strings
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        wireframe={false}
      />
    </mesh>
  );
})
