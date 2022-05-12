import React, { useRef, useEffect } from "react";
import Blob from "../Blob/Blob";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import gsap from "gsap";
import * as THREE from "three";

export default function Blobs2() {
  return (
    <Canvas>
      <PerspectiveCamera
        fov={45}
        aspect={window.innerWidth / window.innerHeight}
        near={0.1}
        far={1000}
        position={[0, 0, 18]}
        makeDefault
      />
      <Scene />
    </Canvas>
  );
}

const Scene = () => {
  let mouse = new THREE.Vector2();
  let mouseTarget = new THREE.Vector2();

  const sceneRef = useRef();

  useEffect(() => {
    window.addEventListener("mousemove", mouseMove.bind(this));
  });

  const mouseMove = (e) => {
    // Calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  };

  useFrame(() => {
    mouseTarget.x = gsap.utils.interpolate(mouseTarget.x, mouse.x, 0.03);
    mouseTarget.y = gsap.utils.interpolate(mouseTarget.y, mouse.y, 0.03);

    sceneRef.current.rotation.x = mouseTarget.y * 0.25;
    sceneRef.current.rotation.y = mouseTarget.x * 0.25;
  });

  const blob = useRef();

  useEffect(() => {
    animBlobs();
  }, []);

  const animBlobs = () => {
    // Move Threejs Blobs
    const tl = gsap.timeline({
      defaults: {
        duration: 2,
        ease: 'power3.inOut'
      },
    });

    tl
      .from(blob.current.position, { z: 5, })
      .from(blob.current.material.uniforms.uAlpha, {
        value: 0,
        stagger: 0.2,
      }, 0);

    return tl;
  }

  return (
    <group ref={sceneRef}>
      <Blob
        ref={blob}
        size={4.5}
        speed={0.15}
        color={1.0}
        density={1.5}
        strength={0.3}
        offset={Math.PI * 2}
        position={[0, 0, 0]}
        rotation={[0, 0, 0]}
      />
    </group>
  );
};
