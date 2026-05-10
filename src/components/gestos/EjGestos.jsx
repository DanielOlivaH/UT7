import Webcam from "react-webcam";
import { useRef, useState, useEffect } from "react";
import * as handTrack from 'handtrackjs';
import Texto from './Texto'

export default function EjGestos() {
  const [bgColor, setBgColor] = useState('pink');
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const labelRef = useRef(null);

  const defaultParams = {
    flipHorizontal: false,
    outputStride: 16,
    imageScaleFactor: 1,
    maxNumBoxes: 20,
    iouThreshold: 0.2,
    scoreThreshold: 0.6,
    modelType: "ssd320fpnlite",
    modelSize: "large",
    bboxLineWidth: "2",
    fontSize: 17,
  };

  const runDetection = async (model) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      webcamRef.current.video.width = video.videoWidth;
      webcamRef.current.video.height = video.videoHeight;
      canvasRef.current.width = video.videoWidth;
      canvasRef.current.height = video.videoHeight;

      const predictions = await model.detect(video);

      if (predictions.length > 0) {
        labelRef.current = predictions[0].label;
        console.log("Label detectado:", labelRef.current);

        if (labelRef.current === "open") {
          window.scrollBy(0, window.innerHeight);
        } else if (labelRef.current === "closed") {
          window.scrollBy(0, -window.innerHeight);
        } else if (labelRef.current === "point") {
          setBgColor('lightblue');
        }
      } else {
        console.log("detecting...");
      }
    }
  };

  useEffect(() => {
    const runHandtrack = async () => {
      const model = await handTrack.load(defaultParams);
      console.log("Model loaded");
      setInterval(() => {
        runDetection(model);
      }, 3000);
    };
    runHandtrack();
  }, []);

  return (
    <>
      <div style={{
        alignItems: 'center',
        display: 'flex',
        backgroundColor: bgColor,
        flexDirection: 'column',
        minHeight: '100px',
      }}>
        <div>
          <h3>Ejemplo Detección Gestos Mano: abierta y cerrada</h3>
          <p>Tienes que conceder acceso a la webcam</p>
          <p>Color actual: <strong>{bgColor}</strong></p>
        </div>
      </div>

      
      <div style={{ position: 'fixed', bottom: 16, right: 16, zIndex: 999 }}>
        <Webcam
          ref={webcamRef}
          style={{ width: 150, height: 150, display: 'block' }}
        />
        <canvas
          ref={canvasRef}
          style={{
            width: 150,
            height: 150,
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        />
      </div>

      <Texto />
    </>
  );
}