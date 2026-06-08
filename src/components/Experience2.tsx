import { useFrame, useThree } from "@react-three/fiber"
import { useEffect, useRef } from "react"
import * as THREE from "three"
import {
  OrbitControls,
  useHelper,
  BakeShadows,
  SoftShadows,
  AccumulativeShadows,
  RandomizedLight,
  ContactShadows,
  Sky,
  Environment,
  Lightformer,
  Stage,
} from "@react-three/drei"

import { useControls, button } from "leva"
import { Perf } from "r3f-perf"

export default function Experience() {
  const groupRef = useRef<THREE.Group>(null)
  const cubeRef = useRef<THREE.Mesh>(null!)
  const sphereRef = useRef<THREE.Mesh>(null!)

  const directionalLightRef = useRef<THREE.DirectionalLight>(null!)
  useHelper(directionalLightRef, THREE.DirectionalLightHelper, 1)

  const { perfVisible } = useControls('perf', {
    perfVisible: true,
  }, { collapsed: true })

  const { position, color, visible, } = useControls('cube', {
    position: {
      value: { x: 3, y: 1 },
      step: 0.01,
      joystick: "invertY",
    },
    color: "#44b7e6",
    visible: true,
    myInterval: {
      min: 0,
      max: 10,
      step: 0.1,
      value: [4, 5],
    },
    clickMe: button(() => {
      console.log("Button clicked")
    }),
    choice: {
      options: ['a', 'b', 'c'],
    }
  }, { collapsed: true })

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
      value: 0.4,
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

  const skySettings = useControls('sky', {
    sunPosition: {
      value: [1, 2, 3],
    },
    inclination: {
      value: 0,
      min: -1,
      max: 1,
      step: 0.01,
    },
    azimuth: {
      value: 0,
      min: -1,
      max: 1,
      step: 0.01,
    },
  }, { collapsed: true })

  const environmentSettings = useControls('environment', {
    envMapIntensity: { value: 7, min: 0, max:12 },
    groundHeight: { value: 7, min: 0, max:100 },
    groundRadius: { value: 28, min: 10, max: 1000 },
    groundScale: { value: 100, min: 10, max: 1000 },
    background: true,
    files: {
      options: {
        "royal esplanade": [
          './environmentMaps/1/px.jpg',
          './environmentMaps/1/nx.jpg',
          './environmentMaps/1/py.jpg',
          './environmentMaps/1/ny.jpg',
          './environmentMaps/1/pz.jpg',
          './environmentMaps/1/nz.jpg',
        ],
        "dawn church": [
          './environmentMaps/2/px.jpg',
          './environmentMaps/2/nx.jpg',
          './environmentMaps/2/py.jpg',
          './environmentMaps/2/ny.jpg',
          './environmentMaps/2/pz.jpg',
          './environmentMaps/2/nz.jpg',
        ],
        "sky on fire": "./environmentMaps/the_sky_is_on_fire_2k.hdr",
      }
    },
    preset: {
      options: ["sunset", "dawn", "night", "warehouse", "apartment", "studio", "city", "forest", "lobby", "park"],
    },
  }, { collapsed: true })

/* 
  const scene = useThree(state => state.scene)

  useEffect(() =>
  {
      // eslint-disable-next-line react-hooks/immutability
      scene.environmentIntensity = environmentSettings.environmentIntensity
  }, [scene, environmentSettings.environmentIntensity])
 */

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime
    
    if (groupRef.current) {
      // groupRef.current.rotation.y += delta * 0.1
    }
    
    // cubeRef.current.position.x = 2 + Math.sin(time) * 1
    cubeRef.current.rotation.y += delta * 0.5

    /* const angle = state.clock.elapsedTime * 0.1;
    state.camera.position.x = Math.cos(angle) * 8
    state.camera.position.z = Math.sin(angle) * 8
    state.camera.lookAt(0, 0, 0) */
  })

  return (
    <>
      {/* <BakeShadows /> */}
      {/* <SoftShadows size={ 50 } samples={ 17 } focus={ 10 } /> */}

      {/* <Environment
        preset={environmentSettings.preset}
        ground={{
          height: environmentSettings.groundHeight,
          radius: environmentSettings.groundRadius,
          scale: environmentSettings.groundScale
        }}
      > */}
        {/* <color args={["black"]} attach="background" />
        <mesh position-z={ -5 } scale={ 10 }>
          <planeGeometry />
          <meshBasicMaterial color={ [0, 0, 255] } />
        </mesh> */}
        {/* <Lightformer
          position-z={ -5 }
          scale={ 10 }
          color="blue"
          intensity={ 10 }
        />
      </Environment> */}

      <color args={["ivory"]} attach="background" />

      {perfVisible && <Perf position="top-left" />}
      
      <OrbitControls makeDefault />

      {/* <AccumulativeShadows
        position={[0, -0.99, 0]}
        scale={ 10 }
        color="blue"
        opacity={ 0.8 }
        frames={ Infinity }
        temporal
        blend={ 100 }
      >
        <RandomizedLight
          amount={ 8 }
          radius={ 1 }
          ambient={ 0.5 }
          intensity={ 3 }
          position={ [ 1, 2, 3 ] }
          bias={ 0.001 }
      />
      </AccumulativeShadows> */}

     {/*  <ContactShadows
        position={[contactShadowSettings.position.x, contactShadowSettings.position.y, contactShadowSettings.position.z]}
        resolution={contactShadowSettings.resolution}
        far={contactShadowSettings.far}
        color={contactShadowSettings.color}
        opacity={contactShadowSettings.opacity}
        blur={contactShadowSettings.blur}
        frames={1}
      /> */}

      {/* <directionalLight
        ref={directionalLightRef}
        position={skySettings.sunPosition}
        intensity={5}
        castShadow
        shadow-mapSize={ [1024 * 2, 1024 * 2] }
        shadow-camera-near={ 1 }
        shadow-camera-far={ 10 }
        shadow-camera-top={ 5 }
        shadow-camera-right={ 5 }
        shadow-camera-bottom={ -5 }
        shadow-camera-left={ -5 }
      />
      
      <ambientLight color={"blue"} intensity={0.5} /> */}

      {/* <Sky
        sunPosition={skySettings.sunPosition}
      /> */}

      {/* <mesh
        ref={ sphereRef }
        position-x={ -3 }
        position-y={ 1 }
        castShadow
      >
        <sphereGeometry />
        <meshStandardMaterial 
          color="orange"
        />
      </mesh>
      <mesh
        ref={ cubeRef }
        position={ [ position.x, position.y, 0 ] }
        position-y={ 1 }
        visible={ visible }
        castShadow
      >
        <boxGeometry />
        <meshStandardMaterial 
          color={color}
        />
      </mesh> */}
      {/* <mesh
        position-y={ - 1 }
        rotation-x={ - Math.PI * 0.5 }
        scale={ 10 }
      >
        <planeGeometry />
        <meshStandardMaterial 
          color="greenyellow"
          side={THREE.DoubleSide}
        />
      </mesh> */}

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
        environment="sunset"
        preset="portrait"
      >
        <mesh
          ref={ sphereRef }
          position-x={ -3 }
          position-y={ 1 }
        >
          <sphereGeometry />
          <meshStandardMaterial 
            color="orange"
          />
        </mesh>
        <mesh
          ref={ cubeRef }
          position={ [ position.x, position.y, 0 ] }
          visible={ visible }
        >
          <boxGeometry />
          <meshStandardMaterial 
            color={color}
          />
        </mesh>
      </Stage>
    </>
  )
}