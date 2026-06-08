import { useGLTF } from "@react-three/drei"

export default function Burger() {
  const burger = useGLTF('./models/hamburger.glb')

  return (
    <>
      <primitive object={ burger.scene } scale={ 0.5 } position-x={ -2 } />
    </>
  );
}

useGLTF.preload('./models/hamburger-draco.glb')