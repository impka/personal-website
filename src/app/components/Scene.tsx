"use client";

import { Environment } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import Bulb from "./Bulb";
import { useRef, useContext, useEffect, useState } from "react";
import LightContext from "../contexts/LightContext";
import { LightContextType } from "../contexts/LightContext";
import { createNoise3D } from "simplex-noise";

const noise3D = createNoise3D();

function WavyPlane() {
  const meshRef = useRef<THREE.Mesh | null>(null);
  const { value } = useContext<LightContextType>(LightContext);
  // plane geometry
  const geometryRef = useRef<THREE.PlaneGeometry | null>(null);

  useFrame(({ clock }, delta) => {
    if (geometryRef.current && meshRef.current) {
      const time = clock.getElapsedTime();
      const geometry = geometryRef.current;

      const position = geometry.attributes.position;
      const count = position.count;

      for (let i = 0; i < count; i++) {
        const x = position.getX(i);
        const y = position.getY(i);

        // base wave motion
        const wave =
          Math.sin(x * 0.5 + time * 0.2) * Math.cos(y * 0.5 + time * 0.2) * 2;

        // smooth noise variation
        const noise = noise3D(x * 0.3, y * 0.3, time * 0.5) * 1.5;

        position.setZ(i, wave + noise);
      }

      position.needsUpdate = true;
      // scale by frame time so the spin speed doesn't depend on refresh rate
      meshRef.current.rotation.z += 0.006 * delta;
    }
  });

  return (
    <mesh
      ref={meshRef}
      rotation={[-Math.PI / 2.2, 0, 0]}
      position={[0, -10, 0]}
    >
      <planeGeometry ref={geometryRef} args={[1000, 1000, 60, 60]} />
      <meshStandardMaterial
        wireframe
        color="#000000"
        opacity={value ? 0.5 : 0.3}
        transparent
      />
    </mesh>
  );
}

export default function Scene({ onLoaded }: { onLoaded: () => void }) {
  const { value } = useContext<LightContextType>(LightContext);
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  // stop rendering once the scene is scrolled out of view
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(([entry]) =>
      setVisible(entry.isIntersecting),
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="h-[150vh] relative z-0">
      <Canvas
        frameloop={visible ? "always" : "never"}
        camera={{ position: [0, 0, 100], fov: 50 }}
      >
        <Bulb onLoaded={onLoaded} />
        <WavyPlane />
        <Environment
          files="/studio_small_03_1k.hdr"
          background={false}
          environmentIntensity={value ? 2 : 0.5}
        />
      </Canvas>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent to-[#E0E0E0] dark:to-black transition-colors duration-500 ease-in-out" />
    </div>
  );
}
