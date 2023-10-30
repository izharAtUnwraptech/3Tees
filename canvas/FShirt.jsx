"use client";

import { Decal, OrbitControls, useGLTF, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import state from "@store";
import { easing } from "maath";
import { useRef } from "react";
import { DoubleSide, Group, MeshBasicMaterial, MeshPhysicalMaterial, MeshStandardMaterial } from "three";
import { useSnapshot } from "valtio";

const FShirt = () => {
  
    const snap = useSnapshot(state);
    const {nodes} = useGLTF('/femF3.glb')
    // return ( console.log(nodes));

    const logoTexture = useTexture(snap.logoDecal)
    const fullTexture = useTexture(snap.fullDecal)
    const backTexture = useTexture(snap.backDecal)
    const sideTexture = useTexture(snap.sideDecal)
    const shirtTexture = useTexture(snap.shirtMat)
    
     // flip start
    if (snap.back) {
        backTexture.repeat.set(-1, 1); // Flip vertically
        backTexture.offset.set(1, 0); //manage rotation
    }else{
        backTexture.repeat.set(1, 1); // Flip vertically
        backTexture.offset.set(0, 0); //manage rotation
    }
    
    // flip 

    let rotation = snap.view;
    const groupRefFem = useRef();

    fullTexture.anisotropy = 16;
    // useFrame( (state,delta) => easing.dampC(materials.lambert1.color,
    //     snap.color,0.25,delta));


    // For Rotation onClick Rotate
    useFrame((state, delta) => {
        snap.back ? groupRefFem.current.rotation.set(0, Math.PI, 0) : groupRefFem.current.rotation.set(0, 0, 0);
    });

    // repeat texture to fit on whole body
    // shirtTexture.repeat.set(1, 2);

    const customMaterial = new MeshPhysicalMaterial({
        color: snap.color, // Set your desired color
        roughness: 0.8,     // Set the roughness
        metalness:0.2,
        transparent:false,
        side: DoubleSide,
        map:shirtTexture, // set shirtTexture to any desired fabric
        
      });
        
    const stateString = JSON.stringify(snap); 
    
    return (
        <>

        <group
        key={stateString} ref={groupRefFem} rotation={[0,0,0]}
        >

            <mesh
                castShadow
                geometry={nodes.Object_5.geometry}
                material={customMaterial}
                scale={[0.8, 0.8, 0.8]}
                dispose={null}
            >

            {snap.isLogoTexture && (
                <Decal 
                position={snap.logoDecalPos}
                rotation={snap.logoRotate}
                scale={snap.logoScale}
                map={logoTexture}
                />
            )} 

            {/* pocket Logo  */}
            {snap.isFullTexture && (
                <Decal 
                position={snap.fullDecalPos}
                rotation={snap.fullRotate}
                scale={snap.fullScale}
                map={fullTexture}
                // map-anisotropy={16}
                depthTest={false}
                depthWrite={true}
                />
            )} 

               {/* backside  */}
               {snap.isbackTexture && (
                <Decal 
                position={snap.backDecalPos}
                rotation={snap.backRotate}
                scale={snap.backScale} //max keep 0.35 scale
                map={backTexture}
                // material={new MeshBasicMaterial({ map: backTexture, transparent: true, opacity: 0 })}
                />
            )} 

            </mesh>

        </group>

        </>
    
  )
}

export default FShirt