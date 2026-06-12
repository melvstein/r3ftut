import { 
  ContactShadows,
  Environment,
  Float,
  Html,
  OrbitControls,
  PresentationControls,
  Text,
 } from "@react-three/drei";

import { useGLTF, Stage } from "@react-three/drei";
import { useEffect } from "react";
import * as THREE from "three";
 
export default function Experience() {
  const laptopModel = useGLTF("./models/laptop/laptop.glb");

  return (
    <>
      {/* <OrbitControls makeDefault /> */}
      <Environment preset="city" />

      <PresentationControls
        rotation={[0.13, 0.1, 0]}
        polar={[-0.4, 0.2]}
        azimuth={[-0.4, 0.1]}
        damping={ 0.1 }
        snap
        global
      >
        <Float rotationIntensity={0.5}>
          <rectAreaLight
            width={2.5}
            height={1.65}
            intensity={100}
            color={"blue"}
            rotation={[ 1, Math.PI, 0 ]}
            position={[ 0.55, 0.55, -0.5 ]}
          />

          <primitive 
            object={laptopModel.scene}
            position-y={-0.4}
            rotation-y={0.5}
            rotation-x={0.2}
            scale={0.9}
          >
            <Html
              wrapperClass="htmlScreen"
              distanceFactor={2}      
              position={[0, 1.95, -1.6]}
              rotation-x={-0.3}
              transform
            >
              <iframe src="https://melvstein.vercel.app/" />
            </Html>
          </primitive>
          <Text
            font="./fonts/woff/FiraCode-Bold.woff"
            fontSize={0.5}
            position={[2, 1.5, 1.5]}
            rotation-y={-1}
            rotation-x={0.1}
            color="white"
            maxWidth={2}
            textAlign="center"
          >
            MELVIN JUSTINE
          </Text>
        </Float>
      </PresentationControls>

      <ContactShadows position={[0, -2, 0]} opacity={0.5} scale={10} blur={1.5} />
    </>
  )
}