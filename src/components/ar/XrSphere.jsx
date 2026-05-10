import { OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";


function XrSphere() {
  const sphereRef = useRef();

  useFrame((state, delta) => {
    sphereRef.current.rotation.y += delta;
  });

  return (
    <>
      <OrbitControls />
      <ambientLight />
   
      <mesh ref={sphereRef} position={[0, 0, -5]}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial color='orange' />
      </mesh>
    </>
  );
}

export default XrSphere;