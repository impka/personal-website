'use client'

import { Environment, Plane } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import Bulb from './Bulb'

export default function Scene() {
  return (
    <Canvas shadows camera={{position: [0, 0, 50], fov:50}}>
        <Bulb/>
        <Plane
            castShadow
            args={[1000,1000]}
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -25, 0]}
        >
            <meshStandardMaterial color="lightgray"/>
        </Plane>
        <Environment preset="city" background={false} />
    </Canvas>
  );
}
