import { 
  Canvas,
  type RootState,
} from '@react-three/fiber'
import Experience from './components/Experience'
import * as THREE from 'three'
import { Leva } from 'leva'
import { Bvh } from "@react-three/drei";

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
        className="touch-none"/* 
        orthographic
        camera={ cameraSettings }
        gl={{ 
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          outputColorSpace: THREE.SRGBColorSpace,
        }}
        onPointerMissed={() => { console.log("Clicked on the canvas, but not on any object") }}
        shadows
        flat */
      >
        {/* 
          blue-400	#60A5FA
          blue-500	#3B82F6
          blue-600	#2563EB
          blue-700	#1D4ED8
          blue-800	#1E40AF
          blue-900	#1E3A8A 
        */}

        <color args={["#1E3A8A"]} attach="background" />
        <Bvh>
          <Experience />
        </Bvh>
      </Canvas>
    </>
  )
}

export default App
