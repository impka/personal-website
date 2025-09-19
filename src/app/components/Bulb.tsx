'use client'

import { useEffect } from "react"
import { useGLTF, Center } from "@react-three/drei"
import { useDrag } from "@use-gesture/react"
import { a, useSpring } from "@react-spring/three"
import * as THREE from 'three'

export default function Bulb() {

    const { scene } = useGLTF("/incandescent_light_bulb.glb")

    useEffect(() => {
        scene.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            const mat = child.material as THREE.MeshStandardMaterial
            mat.emissive = new THREE.Color("#ffcc66")
            mat.emissiveIntensity = 0.05
          }
        })
    }, [scene]);

    const [spring, api] = useSpring(() => ({
        rotX: 0,
        rotY: 0,
        rotZ: 0,
        config: { mass: 1, tension: 170, friction: 26 },
    }))

    const bind = useDrag(({ movement: [x, y] }) => {
        api.start({ rotX: 0, rotY: x / 100, rotZ: 0 })
    })

    return (
        <a.group {...bind()} rotation-x={spring.rotX} rotation-y={spring.rotY} rotation-z={spring.rotZ} position={[-20, 0, 0]}>
            <Center>
                <primitive 
                    object={scene} 
                    scale={150}
                />
                <pointLight 
                    castShadow 
                    intensity={10} 
                    distance={1000} 
                    color="white" />
            </Center>
        </a.group>
    )
}
