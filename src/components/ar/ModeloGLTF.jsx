import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from '@react-three/drei';


function ModeloGLTF() {
  const gltf = useLoader(GLTFLoader, '/casa.glb');
  return (
    <>
      <OrbitControls />
      <ambientLight intensity={1} />
      <directionalLight position={[5, 5, 5]} />
      <primitive object={gltf.scene} position={[0, 0, 0]} />
    </>
  );
}

export default ModeloGLTF;