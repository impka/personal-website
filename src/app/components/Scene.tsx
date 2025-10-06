"use client"

import { Environment } from "@react-three/drei"
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from 'three';
import Bulb from './Bulb'
import { useRef } from "react";
import { createNoise3D } from "simplex-noise";

const noise3D = createNoise3D();

function WavyPlane() {
  const meshRef = useRef<THREE.LineSegments | null>(null)

  // Create a plane geometry that we'll animate
  const geometryRef = useRef<THREE.PlaneGeometry | null>(null)
  const clock = useRef(new THREE.Clock())

  useFrame(() => {
    if(geometryRef.current && meshRef.current){
      const time = clock.current.getElapsedTime()
      const geometry = geometryRef.current

      const position = geometry.attributes.position
      const count = position.count

      for (let i = 0; i < count; i++) {
        const x = position.getX(i)
        const y = position.getY(i)

        // Base wave motion
        const wave = Math.sin(x * 0.5 + time * 0.2) * Math.cos(y * 0.5 + time * 0.2) * 2

        // Add smooth noise variation
        const noise = noise3D(x * 0.3, y * 0.3, time * 0.5) * 1.5

        position.setZ(i, wave + noise)
      }

      position.needsUpdate = true
      meshRef.current.rotation.z += 0.0001
    }
  })

  return (
    <mesh ref={meshRef} rotation={[-Math.PI/2.2, 0, 0]} position={[0,-10, 0]}>
      <planeGeometry ref={geometryRef} args={[1000, 1000, 60, 60]} />
      <meshStandardMaterial 
        wireframe 
        color="#0A0A0A" 
        opacity={0.3}
        transparent
      />
    </mesh>
  )
}



export default function Scene({onLoaded}: { onLoaded: ()=>void}) {
  return (
    <div className="h-[150vh] relative z-0">
      <Canvas shadows camera={{position: [0, 0, 100], fov:50}}>
        <Bulb onLoaded={onLoaded}/>
        <Environment preset="city" background={false}/>
        <WavyPlane/>
      </Canvas>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent to-[#E0E0E0] dark:to-black transition-colors duration-500 ease-in-out" />
    </div>
  );
}
