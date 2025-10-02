import { Environment } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import Bulb from './Bulb'

export default function Scene({onLoaded}: { onLoaded: ()=>void}) {
  return (
    <div className="h-screen">
      <Canvas shadows camera={{position: [0, 0, 50], fov:50}}>
        <Bulb onLoaded={onLoaded}/>
        <Environment preset="city" background={false}/>
      </Canvas>
    </div>
  );
}
