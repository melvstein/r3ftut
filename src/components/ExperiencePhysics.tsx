import { OrbitControls, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { CuboidCollider, CylinderCollider, InstancedRigidBodies, Physics, RapierRigidBody, RigidBody } from "@react-three/rapier";
import { Perf } from "r3f-perf";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

 
export default function Experience() {
  const cubeRef = useRef<RapierRigidBody>(null);
  const twister = useRef<RapierRigidBody>(null);
  const hitSound = useRef(new Audio("./sounds/hit.mp3"));
  const hamburgerModel = useGLTF("./models/hamburger.glb");

  const cubeJumb = () => {
    const mass = cubeRef.current?.mass() ?? 1;
    cubeRef.current?.applyImpulse({ x: 0, y: 5 * mass, z: 0 }, true);
    cubeRef.current?.applyTorqueImpulse({ x: Math.random(), y: Math.random(), z: Math.random() }, true);
  }

  const collisionEnter = () => {
    /* hitSound.current.currentTime = 0;
    hitSound.current.volume = Math.random() * 0.5 + 0.5;
    hitSound.current.play(); */

    if (cubeRef.current) {
      // cubeRef.current.setLinvel({ x: 0, y: 5, z: 0 }, true);
    }
  }

  const cubeCount = 300;
  const [cubeInstances] = useState(() => {
    const instances = [];

    for (let i = 0; i < cubeCount; i++) {
      instances.push({
        key: `cube-${i}`,
        position: [
          (Math.random() - 0.5) * 4,
          Math.random() * 2 + 2,
          (Math.random() - 0.5) * 4,
        ],
        rotation: [
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI,
        ],
        scale: [1, 1, 1],
      });
    }

    return instances;
  });
  /* const cubeInstances = useMemo(() => {
    const cubeInstances = [];

    for (let i = 0; i < cubeCount; i++) {
      cubeInstances.push({
        key: 'cube-' + i,
        position: [
          (Math.random() - 0.5) * 4,
          Math.random() * 2 + 2,
          (Math.random() - 0.5) * 4,
        ],
        rotation: [
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI,
        ],
        scale: [1, 1, 1],
      });
    }

    return cubeInstances;
  }, []); */

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    if (twister.current) {
      const eulerRotation = new THREE.Euler(0, time * 5, 0);
      const quaternionRotation = new THREE.Quaternion().setFromEuler(eulerRotation);
      twister.current.setNextKinematicRotation(quaternionRotation);

      const angle = time * 0.5;
      const x = Math.cos(angle) * 2;
      const z = Math.sin(angle) * 2;
      twister.current.setNextKinematicTranslation({ x, y: -1, z });
    }
  });

  return (
    <>
      <Perf position="top-left" />
      <OrbitControls makeDefault />
      <directionalLight position={[1, 2, 3]} intensity={1.5} castShadow />
      <ambientLight color={"blue"} intensity={0.5} />

      <Physics
        debug={false}
        gravity={[0, -9.81, 0]}
      >
        <RigidBody
          position={[0, 4, 0]}
          colliders="hull"
        >
          <primitive
            castShadow
            object={hamburgerModel.scene}
            scale={0.25}
            position={[0, -0.7, 0]}
          />
          {/* <CylinderCollider args={[0.5, 1.25]} /> */}
        </RigidBody>

        <InstancedRigidBodies
          instances={cubeInstances}
          onCollisionEnter={collisionEnter}
        >
          <instancedMesh
            castShadow
            args={[undefined, undefined, cubeCount]}
          >
            <boxGeometry />
            <meshStandardMaterial color="blue" />
          </instancedMesh>
        </InstancedRigidBodies>

        <RigidBody
          ref={cubeRef}
          position-x={2}
          restitution={0}
          friction={1}
          colliders={false}
          onCollisionEnter={collisionEnter}
          /* onCollisionExit={() => console.log("Collision with the cube exit")}
          onSleep={() => console.log("Cube is sleeping")}
          onWake={() => console.log("Cube is awake")} */
        >
          <mesh
            castShadow
            onClick={cubeJumb}
          >
            <boxGeometry />
            <meshStandardMaterial
              color="blue"
            />
          </mesh>
          <CuboidCollider mass={1} args={[0.5, 0.5, 0.5]} />
        </RigidBody>

        <RigidBody
          colliders="ball"
          restitution={1}
          friction={1}
        >
          <mesh position-x={-2} castShadow>
            <sphereGeometry />
            <meshStandardMaterial
              color={[1.5, 1, 4]}
              toneMapped={false}
            />
          </mesh>
        </RigidBody>

        <RigidBody
          ref={twister}
          type="kinematicPosition"
          friction={0}
          position={[0, -1, 0]}
        >
          <mesh
            castShadow
          >
            <boxGeometry args={[0.5, 0.5, 3]} />
            <meshStandardMaterial color="red" />
          </mesh>
        </RigidBody>

        <RigidBody
          type="fixed"
          colliders={false}
          >
            <CuboidCollider args={[5, 2, 0.5]} position={[0, 0, 5.5]} />
            <CuboidCollider args={[0.5, 2, 5]} position={[-5, 0, 0]} />
            <CuboidCollider args={[5, 2, 0.5]} position={[0, 0, -5]} />
            <CuboidCollider args={[0.5, 2, 5]} position={[5, 0, 0]} />
        </RigidBody>

        <RigidBody
          type="fixed"
          friction={1}
        >
          <mesh position-y={-2} rotation-x={-Math.PI * 0.5} scale-z={0.04} receiveShadow>
            <boxGeometry args={[10, 10, 10]} />
            <meshStandardMaterial color="greenyellow" />
          </mesh>
        </RigidBody>
      </Physics>
    </>
  )
}