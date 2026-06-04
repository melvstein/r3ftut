import { Canvas } from '@react-three/fiber'
import Experience from './components/Experience'
import * as THREE from 'three'

function App() {

  const cameraSettings = {
    position: [3, 2, 6] as const,
    fov: 45,
    near: 0.1,
    far: 200,
    zoom: 100,
  }

  return (
    <Canvas
      orthographic
      camera={ cameraSettings }
      gl={{ 
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        outputColorSpace: THREE.SRGBColorSpace,
     }}
    >
      <Experience />
    </Canvas>
  )
}

export default App
