"use client";

import { Center, Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import state from "@store";
import { useSnapshot } from "valtio";
import Backdrop from "./Backdrop";
import CameraRig from './CameraRig';
import FShirt from "./FShirt";
import Shirt from './Shirt';


const CanvasModel = () => {
    
  const snap = useSnapshot(state);

  return (

      <Canvas
      shadows
      camera={{position:[0,0,5], rotation:[0,0,0], fov:35}}
      gl={{preserveDrawingBuffer:true}}
      className='w-full max-w-full h-full transition-all ease-in'
      >
        <ambientLight intensity={0.5}/>
        <Environment preset="city" />
        <CameraRig>
          
          <Center>
            {/* <OrbitControls /> */}
            
            {snap.isMale ? <Shirt/> : <FShirt/>}
          </Center>
          {/* move backdrop outside cameraRig */}
          <Backdrop/>  
        </CameraRig>
        
      </Canvas>
      )
  }
  
  export default CanvasModel
  