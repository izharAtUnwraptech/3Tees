"use client";

import { AccumulativeShadows, RandomizedLight } from "@react-three/drei";
// import { useFrame } from "@react-three/fiber";
import state from "@store";
// import { easing } from "maath";
import { useRef } from "react";
import { useSnapshot } from "valtio";



const Backdrop = () => {

  const snap = useSnapshot(state);
  
  const shadows= useRef();
  
  return (
                     
    <AccumulativeShadows
    ref={shadows}
    temporal
    frames={60}
    alphaTest={0.4}
    scale={10}
    resolution={2028} 
    rotation={[Math.PI / 2, 0, 0]}
    position={[0, 0, -0.2]}
    >

    <RandomizedLight
      amount={4}
      radius={9}
      intensity={1.5}
      ambient={0.55}
      position={[5,5,-10]}
    />

    <RandomizedLight
      amount={4}
      radius={5}
      intensity={0.25}
      ambient={0.55}
      position={[-5,5,-9]}
    />

    </AccumulativeShadows>


  )
}

export default Backdrop