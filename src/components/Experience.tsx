import { 
  OrbitControls,
  useCursor,
  useGLTF,
  meshBounds,
 } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { useRef, useState } from "react";
import * as THREE from "three";
import { useFrame, type ThreeEvent } from "@react-three/fiber";

export default function Experience() {
  const [hovered, setHovered] = useState<string | null>(null);
  useCursor(hovered !== null );

  const cubeRef = useRef<THREE.Mesh<THREE.BoxGeometry, THREE.MeshStandardMaterial>>(null);
  const hamburger = useGLTF("./models/hamburger.glb");

  const eventHandler = (event: ThreeEvent<MouseEvent>) => {
    console.log("Clicked on the cube", event);
    const color = `hsl(${Math.random() * 360}, 100%, 75%)`;
    console.log("Changing cube color to", color);
    cubeRef.current?.material.color.set(color);
  }

  useFrame((state, delta) => {
    if (cubeRef.current) {
      cubeRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <>
      <color args={["ivory"]} attach="background" />
      <Perf position="top-left" />
      <OrbitControls makeDefault />
      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight color={"blue"} intensity={0.5} />

      <mesh
        ref={cubeRef}
        raycast={meshBounds}
        position-x={2}
        onClick={eventHandler}
        onPointerEnter={() => setHovered("cube")}
        onPointerLeave={() => setHovered(null)}
      >
        <boxGeometry />
        <meshStandardMaterial
          color={ hovered === "cube" ? 'hotpink' : 'blue'}
        />
      </mesh>

      <mesh
        position-x={-2}
        onClick={(event) => event.stopPropagation()}
        onPointerEnter={() => setHovered("sphere")}
        onPointerLeave={() => setHovered(null)}
      >
        <sphereGeometry />
        <meshStandardMaterial color="red" />
      </mesh>

      <primitive
        object={hamburger.scene}
        scale={0.2}
        position-y={2}
        rotation-y={Math.PI * 0.25}
        onClick={(event: ThreeEvent<MouseEvent>) => {
          event.stopPropagation();
          console.log(event.object.name);
        }}
        onPointerEnter={() => setHovered("hamburger")}
        onPointerLeave={() => setHovered(null)}
      />

      <mesh
        position-y={-1}
        rotation-x={-Math.PI * 0.5}
        scale={10}
      >
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>
    </>
  )
}