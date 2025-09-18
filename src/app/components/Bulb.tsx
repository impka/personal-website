'use client'

import { useGLTF } from "@react-three/drei"

export default function Bulb() {
  const { scene } = useGLTF("/incandescent_light_bulb.glb")
  return (
    <primitive object={scene} scale={75} position={[-7,-5,0]}/>
  );
}
