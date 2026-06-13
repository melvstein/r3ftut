import { ContactShadows, Box, Environment, OrbitControls, Plane, Sphere } from "@react-three/drei";

export default function Experience() {

  return (
    <>
      <OrbitControls makeDefault />
      <Environment preset="sunset" />
      <ContactShadows
        position={[0, -1, 0]}
        resolution={512}
        far={5}
        color="blue"
        opacity={0.5}
        blur={1}
        frames={1}
      />
      <Box
        castShadow
        position-x={2}
      >
        <meshStandardMaterial color="orange" />
      </Box>

      <Sphere
        castShadow
        position-x={-2}
      >
        <meshStandardMaterial color="purple" />
      </Sphere>

      <Plane
        receiveShadow
        scale={10}
        rotation-x={-Math.PI * 0.5}
        position-y={-1}
      >
        <meshStandardMaterial color="green" />
      </Plane>
    </>
  )
}