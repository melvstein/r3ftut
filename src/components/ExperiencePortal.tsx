import { 
  OrbitControls,
  useGLTF,
  useTexture,
  Center,
  Sparkles,
  shaderMaterial,
 } from "@react-three/drei";
import { Perf } from "r3f-perf";
import * as THREE from "three";
import portalVertexShader from "../shaders/portal/vertex.glsl"
import portalFragmentShader from "../shaders/portal/fragment.glsl"
import { extend, type ThreeElement, useFrame } from "@react-three/fiber";
import { useRef } from "react";

const PortalMaterial = shaderMaterial(
  {
    uTime: 0,
    uColorStart: new THREE.Color("#ffffff"),
    uColorEnd: new THREE.Color("#0000ff"),
  },
  portalVertexShader,
  portalFragmentShader
);

extend({ PortalMaterial });

declare module "@react-three/fiber" {
  interface ThreeElements {
    portalMaterial: ThreeElement<typeof PortalMaterial>;
  }
}

export default function Experience() {
  const portalModel = useGLTF("./models/portal/portal.glb");
  const bakedTexture = useTexture("./models/portal/baked.jpg");
  const portalMaterialRef = useRef<THREE.ShaderMaterial>(null!);

  /* const bakedTextureMemo = useMemo(() => {
    const texture = bakedTexture.clone();
    texture.flipY = false;
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;
    return texture;
  }, [bakedTexture]); */

  useFrame((state, delta) => {
    if (portalMaterialRef.current) {
      portalMaterialRef.current.uTime += delta;
    }
  })

  return (
    <>
      <Perf position="top-left" />
      <color args={["#030202"]} attach="background" />
      <OrbitControls makeDefault />

      <Center>
        <mesh
          geometry={(portalModel.nodes.baked as THREE.Mesh).geometry}
        >
          <meshBasicMaterial
            map={bakedTexture}
            map-flipY={false}
          />
        </mesh>
        <mesh
          geometry={(portalModel.nodes.portalLight as THREE.Mesh).geometry}
          position={portalModel.nodes.portalLight.position}
          rotation={portalModel.nodes.portalLight.rotation}
        >
          <portalMaterial ref={portalMaterialRef} />
        </mesh>
        <mesh
          geometry={(portalModel.nodes.poleLightA as THREE.Mesh).geometry}
          position={portalModel.nodes.poleLightA.position}
        >
          <meshBasicMaterial
            color={"#0000ff"}
          />
        </mesh>
        <mesh
          geometry={(portalModel.nodes.poleLightB as THREE.Mesh).geometry}
          position={portalModel.nodes.poleLightB.position}
        >
          <meshBasicMaterial
            color={"#0000ff"}
          />
        </mesh>

        <Sparkles
          size={10}
          scale={[0.8, 0.8, 0]}
          position={[0, 0.9, -1.7]}
          speed={0.5}
          count={40}
          color={"#0000ff"}
        />

        <Sparkles
          size={6}
          scale={[4, 2, 4]}
          position-y={1}
          speed={0.5}
          count={40}
          color={"#00ffff"}
        />
      </Center>
    </>
  )
}