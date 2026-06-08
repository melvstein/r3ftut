import { Canvas, type RootState } from '@react-three/fiber'
import Experience from './components/Experience'
import * as THREE from 'three'
import { Leva } from 'leva'

const created = (state: RootState) => {
  console.log("Canvas created")
  /* state.gl.setClearColor("blue", 0.5) */
  state.scene.background = new THREE.Color("blue")
}

function App() {

  const cameraSettings = {
    position: [3, 2, 6] as const,
    fov: 45,
    near: 0.1,
    far: 200,
    zoom: 100,
  }

  return (
    <>
      <Leva collapsed />
      <Canvas
        orthographic
        camera={ cameraSettings }
        gl={{ 
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          outputColorSpace: THREE.SRGBColorSpace,
        }}
        shadows
      >
        <color args={["ivory"]} attach="background" />
        <Experience />
      </Canvas>
    </>
  )
}

export default App
