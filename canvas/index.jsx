"use client";

import { Center, Environment, OrbitControls } from "@react-three/drei";
import dynamic from 'next/dynamic';
import { Canvas } from "@react-three/fiber";
import state from "@store";
import { useSnapshot } from "valtio";
import Backdrop from "./Backdrop";
import CameraRig from './CameraRig';

// Dynamic Imorts of Models
// const Shirt = dynamic(() => import('./Shirt'), { ssr: false });
// const FShirt = dynamic(() => import('./FShirt'), { ssr: false });
// const ColleredTshirt = dynamic(() => import('./ColleredTshirt'), { ssr: false });
// const OverSizedMale = dynamic(() => import('./OverSizedMale'), { ssr: false });

// Normal Imorts of Models
import FShirt from "./FShirt";
import Shirt from './Shirt';
import ColleredTshirt from "./ColleredTshirt";
import OverSizedMale from "./OverSizedMale";


import { useRef } from "react";


const CanvasModel = () => {
    
  const snap = useSnapshot(state);
  const canvasRef = useRef();

  // for cameraRig reference
  const group = useRef();

  // downloadFrontCanvas
  const downloadFrontCanvas = () => {
    
      // downloadCanvas logic 

      const canvas = canvasRef.current;
    if(canvas){

      group.current.rotation.set(0, 0, 0);

      setTimeout(function(){
      
        // code to download front canvas view
      const dataUrl = canvas.toDataURL();
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = 'your_image.png';
      a.click()

      state.back = true;
      state.front = false;


      }, 1000)
    

    }else{
      alert('canvas not found')

    }
}


  // downloadBackMainCanvas
  const downloadBackCanvasMain = () => {
 
      // downloadBackCanvas logic
      const canvas = canvasRef.current;
      if(canvas){
  
        // code to download back canvas view
        setTimeout(function(){
  
            const dataUrlBack = canvas.toDataURL();
            const aback = document.createElement('a');
            aback.href = dataUrlBack;
            aback.download = 'your_back.png';
            aback.click()

            state.downloadInProgress = false;
  
            
        },1500)
  
      }else{
        alert('back canvas not found');
     
      }


    
  }

  const initiateDownload = () => {
    if(!snap.downloadInProgress && snap.toDownload){
      state.downloadInProgress = true;

      downloadFrontCanvas()
      downloadBackCanvasMain()

      state.toDownload = false;
  
    }
  }

// download onClick in create page
  initiateDownload();

  return (

      <Canvas
      shadows
      camera={{position:[0,0,5], rotation:[0,0,0], fov:35}}
      gl={{preserveDrawingBuffer:true}}
      className='w-full max-w-full h-full transition-all ease-in '
      ref={canvasRef}
      >
        <ambientLight intensity={0.5}/>
        <Environment preset="city" />
        <CameraRig group={group} >
          
          <Center>
            {/* <OrbitControls /> */}
            {snap.isMale && <Shirt/>}
            {snap.isFemale && <FShirt/>}
            {snap.isCollored && <ColleredTshirt/>}
            {snap.isOversized && <OverSizedMale/>}
          </Center>
          {/* move backdrop outside cameraRig */}
          <Backdrop/>  
        </CameraRig>
        
      </Canvas>
      )
  }
  
  export default CanvasModel
  