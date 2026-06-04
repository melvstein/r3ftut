import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import * as THREE from "three"
import { OrbitControls } from "@react-three/drei"
import CustomGeometry from "./CustomGeometry"

export default function Experience() {
  const groupRef = useRef<THREE.Group>(null)
  const cubeRef = useRef<THREE.Mesh>(null)

  useFrame((state, delta) => {
    if (groupRef.current) {
      // groupRef.current.rotation.y += delta * 0.1
    }

    if (cubeRef.current) {
      cubeRef.current.rotation.y += delta * 0.5
    }

    /* const angle = state.clock.elapsedTime * 0.1;
    state.camera.position.x = Math.cos(angle) * 8
    state.camera.position.z = Math.sin(angle) * 8
    state.camera.lookAt(0, 0, 0) */
  })

  return (
    <>
      <OrbitControls makeDefault />
      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight color={"blue"} intensity={0.5} />

      <group ref={ groupRef }>
        <mesh position-x={ -2 }>
          <sphereGeometry />
          <meshStandardMaterial 
            color="orange"
          />
        </mesh>
        <mesh ref={ cubeRef } rotation-y={ Math.PI * 0.25 } position-x={ 2 }>
          <boxGeometry />
          <meshStandardMaterial 
            color="blue"
          />
        </mesh>
      </group>

      <CustomGeometry />

      <mesh
        position-y={ - 1 }
        rotation-x={ - Math.PI * 0.5 }
        scale={ 10 }
      >
        <planeGeometry />
        <meshStandardMaterial 
          color="greenyellow"
          side={THREE.DoubleSide}
        />
      </mesh>
    </>
  )
}