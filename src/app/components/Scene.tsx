'use client'

import { Environment } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import Bulb from './Bulb'

export default function Scene() {
  return (
    <Canvas camera={{position: [0, 0, 20], fov:50}}>
        <ambientLight intensity={1}/>
        <Bulb/>
        <Environment preset="city" background={false} />
    </Canvas>
  );
}
