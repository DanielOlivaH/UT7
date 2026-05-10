import { Canvas } from "@react-three/fiber";
import { ARButton, XR } from "@react-three/xr";
import { Suspense } from "react";
import ModeloGLTF from './ModeloGLTF';

function EjARModelo() {
  return (
    <>
      <ARButton />
      <Canvas>
        <XR>
          <Suspense fallback={null}>
            <ModeloGLTF />
          </Suspense>
        </XR>
      </Canvas>
    </>
  );
}

export default EjARModelo;  