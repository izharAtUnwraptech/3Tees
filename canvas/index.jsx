"use client";

import { Center, Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import state from "@store";
import { useSnapshot } from "valtio";
import Backdrop from "./Backdrop";
import CameraRig from './CameraRig';
import FShirt from "./FShirt";
import Shirt from './Shirt';
import { useRef } from "react";


const CanvasModel = () => {
    
  const snap = useSnapshot(state);
  const canvasRef = useRef();

  // for cameraRig reference
  const group = useRef();

  // declare downloadCanvas function to download images front and back, for this frontView is considered
  // const downloadCanvas = () => {

  //   const canvas = canvasRef.current;
  //   if(canvas){

  //     group.current.rotation.set(0, 0, 0);

  //     window.setTimeout(function(){
      
  //       // code to download front canvas view
  //     const dataUrl = canvas.toDataURL();
  //     const a = document.createElement('a');
  //     a.href = dataUrl;
  //     a.download = 'your_image.png';
  //     a.click()

  //     state.back = true;
  //     state.front = false;


  //     }, 1000)
      

  //   }else{
  //     alert('canvas not found')
  //   }


  //   return;

  // }



  

    // const downloadBackCanvas = () => {

  //   const canvas = canvasRef.current;
  //   if(canvas){

  //     group.current.rotation.set(0, 0, 0);
  //     // code to download back canvas view
  //     setTimeout(function(){

  //         const dataUrlBack = canvas.toDataURL();
  //         const aback = document.createElement('a');
  //         aback.href = dataUrlBack;
  //         aback.download = 'your_back.png';
  //         aback.click()

          
  //     },2000)

  //     // state.toDownload = false;
      
  //   }else{
  //     alert('back canvas not found')
  //   }

  //   return;

  // }

  // downloadFrontCanvas
  const downloadFrontCanvas = () => {
    
      // Your downloadCanvas logic here

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
    // state.toDownload = false;

      // Your downloadBackCanvas logic here
      const canvas = canvasRef.current;
      if(canvas){
  
        // group.current.rotation.set(0, 0, 0);
        // code to download back canvas view
        setTimeout(function(){
  
            const dataUrlBack = canvas.toDataURL();
            const aback = document.createElement('a');
            aback.href = dataUrlBack;
            aback.download = 'your_back.png';
            aback.click()

            state.downloadInProgress = false;
  
            
        },1500)
  
        // state.toDownload = false;
        //state.downloadInProgress = false;
        
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
      
  
      // downloadFrontCanvas()
      // .then(() => downloadBackCanvasMain())
      // .then(() => {
      //   // alert('now falsing')
      //   state.toDownload = false;
      //   downloadInProgress = false;
      // })
      // .catch((e) => {
      //   alert('unable to download proper image')
      //   downloadInProgress = false;
      // })
  
    }
  }

// download onClick in create page
  initiateDownload();

  return (

      <Canvas
      shadows
      camera={{position:[0,0,5], rotation:[0,0,0], fov:35}}
      gl={{preserveDrawingBuffer:true}}
      className='w-full max-w-full h-full transition-all ease-in'
      ref={canvasRef}
      >
        <ambientLight intensity={0.5}/>
        <Environment preset="city" />
        <CameraRig group={group} >
          
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
  