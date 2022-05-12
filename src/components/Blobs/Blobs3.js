import React, { useRef, useEffect } from "react";
import Blob from "../Blob/Blob";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import gsap from "gsap";
import * as THREE from "three";

export default function Blobs3() {
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

  const blob1 = useRef();
  const blob2 = useRef();

  useEffect(() => {
    animBlobs();
  }, []);

  const animBlobs = () => {
    // Move Threejs Blobs
    const tl = gsap.timeline();

    const scales = [
      blob1.current.scale,
      blob2.current.scale,
    ];

    tl
      .from(scales, {
        duration: 2,
        x: 0,
        y: 0,
        z: 0,
        ease: 'power3.inOut',
        stagger: 0.2,
      });
      
    return tl;
  };

  return (
    <group ref={sceneRef}>
      <Blob
        ref={blob1}
        size={3}
        speed={0.3}
        color={0.25}
        density={2.0}
        strength={0.15}
        offset={Math.PI * 1}
        position={[-5, 0, 0]}
        // rotation={[5, 0, 0]}
      />
      <Blob
        ref={blob2}
        size={3}
        speed={0.25}
        color={0.5}
        density={1.5}
        strength={0.12}
        offset={Math.PI * 0}
        position={[5, 0, 0]}
        // rotation={[0.4, 1.0, -0.4]}
      />
    </group>
  );
};
