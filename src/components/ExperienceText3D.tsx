import { 
  OrbitControls,
  Text3D,
  Center,
  useMatcapTexture,
 } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { useState, useEffect, useRef } from "react";
import { useControls } from "leva";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

/* const torusGeometry = new THREE.TorusGeometry();
const material = new THREE.MeshMatcapMaterial(); */

export default function Experience() {
  const [torusGeometry, setTorusGeometry] = useState<THREE.TorusGeometry>();
  const [material, setMaterial] = useState<THREE.MeshMatcapMaterial>();
  const donutsRef = useRef<THREE.Group>(null)

  const matcapTextureSettings = useControls('matcap texture', {
    texture: {
      options: [
        "7877EE_D87FC5_75D9C7_1C78C0",
        "85B9D3_C9EAF9_417277_528789",
        "CCF6FA_9DD9EB_82C5D9_ACD4E4",
      ]
    },
    format: {
      options: [
        256,
        512,
        1024,
      ]
    }
  }, { collapsed: true })


  const [ matcapTexture ] = useMatcapTexture(matcapTextureSettings.texture, matcapTextureSettings.format);

  useEffect(() => {
    /* matcapTexture.colorSpace = THREE.SRGBColorSpace;
    matcapTexture.needsUpdate = true;

    material.matcap = matcapTexture;
    material.needsUpdate = true; */
    
  }, [matcapTexture])

  useFrame((state, delta) => {
    for(const donut of donutsRef.current!.children) {
      donut.rotation.x += delta * 0.2;
      donut.rotation.y += delta * 0.2;
    }
  })

  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />

      <torusGeometry ref={ setTorusGeometry } />
      <meshMatcapMaterial ref={ setMaterial } matcap={matcapTexture} />

      {/* <mesh scale={ 1.5 }>
        <boxGeometry />
        <meshNormalMaterial />
      </mesh> */}

      <Center>
        <Text3D
          font="/fonts/helvetiker_regular.typeface.json"
          size={ 0.75 }
          height={ 0.2 }
          curveSegments={ 12 }
          bevelEnabled
          bevelThickness={ 0.02 }
          bevelSize={ 0.02 }
          bevelOffset={ 0 }
          bevelSegments={ 5 }
          material={ material }
        >
          Melvstein
        </Text3D>

        <group ref={donutsRef}>
          {
            [...Array(100)].map((_, i) => {
              return (
                <Donut key={ i } geometry={ torusGeometry } material={ material } />
              )
            })
          }
        </group>
        
      </Center>
    </>
  )
}

const Donut = ({ geometry, material } : { 
  geometry?: THREE.BufferGeometry,
  material?: THREE.Material
 }) => {
  const [position] = useState<[number, number, number]>(() => [
    (Math.random() - 0.5) * 10,
    (Math.random() - 0.5) * 10,
    (Math.random() - 0.5) * 10,
  ]);

  const [rotation] = useState<[number, number, number]>(() => [
    Math.random() * Math.PI,
    Math.random() * Math.PI,
    0,
  ]);

  const [scale] = useState(() => 0.2 + Math.random() * 0.2);

  return (
    <mesh
      geometry={ geometry }
      position={position}
      rotation={rotation}
      scale={scale}
      material={ material }
    >
    </mesh>
  );
}