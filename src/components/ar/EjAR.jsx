import { Canvas } from "@react-three/fiber";
import XrSphere from './XrSphere';   
import { ARButton, XR } from "@react-three/xr";

function EjAR() {
  return (
    <>
      <ARButton />
      <Canvas>
        <XR>
          <XrSphere />   
        </XR>
      </Canvas>
    </>
  );
}

export default EjAR;