import * as THREE from "three";

export default function Cube({ cubeRef, scale = 1 }: { cubeRef: React.RefObject<THREE.Mesh>, scale?: number }) {
    return <mesh ref={ cubeRef } position-x={ 3 } scale={ scale }>
        <boxGeometry />
        <meshStandardMaterial 
          color="blue"
        />
      </mesh>
}