import { 
  OrbitControls,
  useCursor,
  useGLTF,
  meshBounds,
  Stage,
 } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { useRef, useState } from "react";
import * as THREE from "three";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import { Bloom, Depth, DepthOfField, EffectComposer, Glitch, Noise, ToneMapping, Vignette } from "@react-three/postprocessing";
import { ToneMappingMode, BlendFunction, GlitchMode } from "postprocessing";
import { useControls } from "leva";
import Drunk from "./effects/drunk/Drunk";
import type DrunkEffect from "./effects/drunk/DrunkEffect";

export default function Experience() {
  const [hovered, setHovered] = useState<string | null>(null);
  useCursor(hovered !== null );

  const cubeRef = useRef<THREE.Mesh<THREE.BoxGeometry, THREE.MeshStandardMaterial>>(null);
  const drunkRef = useRef<DrunkEffect>(null);
  const hamburger = useGLTF("./models/hamburger.glb");

  const eventHandler = (event: ThreeEvent<MouseEvent>) => {
    console.log("Clicked on the cube", event);
    const color = `hsl(${Math.random() * 360}, 100%, 75%)`;
    console.log("Changing cube color to", color);
    cubeRef.current?.material.color.set(color);
  }

  const contactShadowSettings = useControls('contact shadow', {
      position: {
        value: { x: 0, y: 0, z: 0 },
        step: 0.01,
        joystick: "invertY",
      },
      resolution: {
        value: 512,
        step: 1,
      },
      far: 5,
      color: "#1d8f75",
      opacity: {
        value: 1,
        min: 0,
        max: 1,
        step: 0.01,
      },
      blur: {
        value: 2.8,
        min: 0,
        max: 10,
        step: 0.01,
      },
    }, { collapsed: true })

  const drunkSettings = useControls('drunk effect', {
    frequency: {
      value: 2,
      min: 0,
      max: 20,
      step: 0.01,
    },
    amplitude: {
      value: 0.1,
      min: 0,
      max: 1,
      step: 0.01,
    },
    speed: {
      value: 1,
      min: 0,
      max: 10,
      step: 0.01,
    },
    color: {
      value: [0.8, 1.0, 0.5],
      min: 0,
      max: 1,
      step: 0.01,
    }
  }, { collapsed: true })

  useFrame((state, delta) => {
    if (cubeRef.current) {
      cubeRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <>
      <EffectComposer multisampling={8}>
        {/* <Vignette
          offset={ 0.3 }
          darkness={ 0.9 }
          blendFunction={BlendFunction.COLOR_BURN}
        /> */}
        {/* <Glitch
          mode={GlitchMode.SPORADIC} 
        /> */}
        {/* <Noise
          premultiply
          blendFunction={BlendFunction.SOFT_LIGHT}
        /> */}
        {/* <Bloom luminanceThreshold={ 0 } intensity={1} mipmapBlur /> */}
        {/* <DepthOfField focusDistance={0.025} focalLength={0.025} bokehScale={6} height={480} /> */}
        <Drunk
          ref={drunkRef}
          frequency={drunkSettings.frequency}
          amplitude={drunkSettings.amplitude}
          speed={drunkSettings.speed}
          color={drunkSettings.color}
        />
        <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
      </EffectComposer>

      <Perf position="top-left" />
      <OrbitControls makeDefault />
      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight color={"blue"} intensity={0.5} />

      <Stage
        shadows={{
          type: 'contact',
          resolution: contactShadowSettings.resolution,
          far: contactShadowSettings.far,
          color: contactShadowSettings.color,
          opacity: contactShadowSettings.opacity,
          blur: contactShadowSettings.blur,
          frames: 1,
        }}
        environment={null}
        preset="portrait"
      >
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
            color={ [0, 0, 1] }
          />
        </mesh>
{/* 
        <mesh
          ref={cubeRef}
          raycast={meshBounds}
          position-x={4}
          onClick={eventHandler}
          onPointerEnter={() => setHovered("cube")}
          onPointerLeave={() => setHovered(null)}
        >
          <boxGeometry />
          <meshStandardMaterial
            color="blue"
            emissive="blue"
            emissiveIntensity={50}
            toneMapped={false}
          />
        </mesh> */}

        <mesh
          position-x={-2}
          onClick={(event) => event.stopPropagation()}
          onPointerEnter={() => setHovered("sphere")}
          onPointerLeave={() => setHovered(null)}
        >
          <sphereGeometry />
          <meshStandardMaterial
            color={hovered === "sphere" ? 'hotpink' : [1.5, 1, 4]}
            toneMapped={false}
          />
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

        {/* <mesh
          position-y={-1}
          rotation-x={-Math.PI * 0.5}
          scale={10}
        >
          <planeGeometry />
          <meshStandardMaterial color="greenyellow" />
        </mesh> */}
      </Stage>
    </>
  )
}