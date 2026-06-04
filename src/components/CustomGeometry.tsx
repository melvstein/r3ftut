import { useRef, useMemo, useEffect } from "react";
import * as THREE from "three";

export default function CustomGeometry() {
  const geometryRef = useRef<THREE.BufferGeometry>(null);
  
  useEffect(() => {
    geometryRef.current?.computeVertexNormals();
  }, []);

  const verticesCount = 10 * 3;
  
  const positions = useMemo(() => {
    const positions = new Float32Array(verticesCount * 3);

    for (let i = 0; i < verticesCount * 3; i++) {
      // eslint-disable-next-line react-hooks/purity
      positions[i] = (Math.random() - 0.5) * 4;
    }

    return positions;
  }, [verticesCount]);

  return (
    <mesh>
      <bufferGeometry ref={geometryRef}>
        <bufferAttribute
          args={[positions, 3]}
          attach="attributes-position"
          count={verticesCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <meshStandardMaterial color="red" side={THREE.DoubleSide} />
    </mesh>
  );
}