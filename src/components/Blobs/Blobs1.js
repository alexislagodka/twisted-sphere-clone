import React, { useRef, useEffect } from "react";
import Blob from "../Blob/Blob";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import gsap from "gsap";
import * as THREE from "three";

export default function Blobs1() {
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
  const blob3 = useRef();

  useEffect(() => {
    animBlobs();
  }, []);

  const animBlobs = () => {
    // Move Threejs Blobs
    const tl = gsap.timeline({
      defaults: {
        duration: 2,
        ease: "power3.inOut",
      },
    });

    const uniformAlphas = [
      blob1.current.material.uniforms.uAlpha,
      blob2.current.material.uniforms.uAlpha,
      blob3.current.material.uniforms.uAlpha,
    ];

    tl.from(blob1.current.position, { z: -5 })
      .from(blob2.current.position, { z: -30 }, "-=1.75")
      .from(blob3.current.position, { z: 12 }, "-=1.75")
      .from(
        uniformAlphas,
        {
          value: 0,
          stagger: 0.2,
          ease: "power3.inOut",
        },
        0
      );

    return tl;
  };

  return (
    <group ref={sceneRef}>
      <Blob
        ref={blob1}
        size={1.75}
        speed={0.3}
        color={0.5}
        density={1.5}
        strength={0.12}
        offset={Math.PI * 1}
        position={[-8.5, 3.25, 2]}
        rotation={[-0.4, 0, 0.5]}
      />
      <Blob
        ref={blob2}
        size={6.0}
        speed={0.15}
        color={0.4}
        density={2.0}
        strength={0.3}
        offset={Math.PI * 2}
        position={[11, -3, -10]}
        rotation={[0.4, 1.0, -0.4]}
      />
      <Blob
        ref={blob3}
        size={0.8}
        speed={0.5}
        color={0.1}
        density={2.0}
        strength={0.05}
        offset={Math.PI * 0.5}
        position={[-1, -4, 4]}
        rotation={[0, 0, 0]}
      />
    </group>
  );
};
