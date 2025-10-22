'use client'

import { useContext, useEffect } from "react"
import { useGLTF, Center } from "@react-three/drei"
import { useDrag } from "@use-gesture/react"
import { a, useSpring } from "@react-spring/three"
import * as THREE from 'three'

import LightContext from "../contexts/LightContext"
import { LightContextType } from "../contexts/LightContext"

export default function Bulb({onLoaded}: {onLoaded: () => void}) {
    const {value, setValue} = useContext<LightContextType>(LightContext)
    const { scene } = useGLTF("/light_bulb.glb")

    useEffect(() => {
        scene.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            const mat = child.material as THREE.MeshStandardMaterial
            if(value){
                mat.emissive = new THREE.Color("#ffcc66");
                mat.emissiveIntensity = 10;
            } else {
                mat.emissiveIntensity = 0;
            }
          }
        })
    }, [value, scene]);

    useEffect(() => {
        if (scene && onLoaded) {
          onLoaded(); // notify parent that loading is done
        }
    }, [scene, onLoaded]);

    const [spring, api] = useSpring(() => ({
        rotX: 0,
        rotY: 0,
        rotZ: 0,
        config: { mass: 1, tension: 170, friction: 26 },
    }))

    const bind = useDrag(({ movement: [x, _y] }) => {
        api.start({ rotX: 0, rotY: x / 100, rotZ: 0 })
    })

    return (
        <a.group 
            {...bind()} 
            onClick={() => setValue ? setValue((prev) => !prev) : console.log("setValue does not exist")}
            rotation-x={spring.rotX} 
            rotation-y={spring.rotY} 
            rotation-z={spring.rotZ} 
            position={[-20, 10, 20]}>
            <Center>
                <primitive 
                    object={scene} 
                    scale={30}
                />
                <pointLight 
                    castShadow 
                    intensity={value ? 5000: 0} 
                    distance={1000} 
                    color="#ffe991" />
            </Center>
        </a.group>
    )
}
