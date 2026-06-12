import { 
  OrbitControls,
 } from "@react-three/drei";

 import { useGLTF, Stage } from "@react-three/drei";
 
export default function Experience() {
  const laptopModel = useGLTF("./models/laptop/laptop.glb");
  
  return (
    <>
      <OrbitControls makeDefault />

      <Stage>
        <primitive object={laptopModel.scene} scale={0.05} />
        <mesh position-x={2}>
          <boxGeometry />
          <meshStandardMaterial color="white" />
        </mesh>
      </Stage>
    </>
  )
}