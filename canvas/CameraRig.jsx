import {useRef} from 'react';
import {useFrame} from '@react-three/fiber';
import {easing} from 'maath';
import { useSnapshot } from 'valtio'
import { OrbitControls } from '@react-three/drei';
import state from '@store';


const CameraRig = ({children, group}) => {

    
    const snap = useSnapshot(state);
    const camPos = snap.camPos;

    // render every frame
    useFrame( (state,delta) => {

        // set responsive breakpoints
        const isBreakpoint =  window.innerWidth <= 1260;
        const isMobile = window.innerWidth <= 600;
        
        // set the initial position
        let targetPosition = camPos;
        if(snap.intro){
            if(isBreakpoint) targetPosition = [0,0,2];
            if(isMobile) targetPosition = [0,0.2,2.5];
        }else{
            if(isBreakpoint) targetPosition = [0,0,2.5];
            if(isMobile) targetPosition = [0,0,3];
        }

        // set model camera position
        easing.damp3( state.camera.position , targetPosition, 0.25, delta)
        
        if(!snap.downloadInProgress){
            // set the model rotation smoothly
            easing.dampE(
                group.current.rotation,
                [state.pointer.y/2, -state.pointer.x/1.2, 0],
                // [state.pointer.y/4, -state.pointer.x/1, 0],
                0.25,
                delta
            )
        }
    
    })


    

  return (
    <>
        {/* <OrbitControls/> */}
        <group ref={group}>{children}</group>
    </>
    )
}

export default CameraRig