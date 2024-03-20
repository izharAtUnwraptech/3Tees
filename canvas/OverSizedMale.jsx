"use client";

import { Decal, OrbitControls, useGLTF, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import state from "@store";
import { easing } from "maath";
import { useRef } from "react";
import { DoubleSide, MeshBasicMaterial, MeshPhysicalMaterial, MeshStandardMaterial } from "three";
import { useSnapshot } from "valtio";

const OverSizedMale = () => {
  
    const snap = useSnapshot(state);
    const {nodes,materials} = useGLTF('/OSTCompressed.glb')
    // return ( console.log(nodes));

    const logoTexture = useTexture(snap.logoDecal)
    const fullTexture = useTexture(snap.fullDecal)
    const backTexture = useTexture(snap.backDecal)
    const sideTexture = useTexture(snap.sideDecal)
    // const shirtTexture = useTexture(snap.shirtMat)
    // shirtTexture.repeat.set(5,5);
    
    
     // flip start
    if (snap.back) {
        backTexture.repeat.set(-1, 1); // Flip vertically
        backTexture.offset.set(1, 0); //manage rotation
    }else{
        backTexture.repeat.set(1, 1); // Flip vertically
        backTexture.offset.set(0, 0); //manage rotation
    }
    
    // flip end

    let rotation = snap.view;
    const groupRef = useRef();

    fullTexture.anisotropy = 16;
    // useFrame( (state,delta) => easing.dampC(materials.lambert1.color,
    //     snap.color,0.25,delta));


    useFrame((state, delta) => {
        
        snap.back ? groupRef.current.rotation.set(0, Math.PI, 0) : groupRef.current.rotation.set(0, 0, 0);
    });

    // repeat texture to fit on whole body
    // shirtTexture.repeat.set(1, 2);

    const customMaterial = new MeshPhysicalMaterial({
        color: snap.color, // Set your desired color
        roughness: 0.8,     // Set the roughness
        metalness:0.2,
        transparent:true,
        // side: DoubleSide,
        //map:shirtTexture, // set shirtTexture to any desired fabric
        
      });
        
    const stateString = JSON.stringify(snap); 
    
  
    return (
        <>

        {/* <OrbitControls/> */}

        <group
        key={stateString} ref={groupRef} rotation={[0,0,0]}
        >
            <mesh
                castShadow
                geometry={nodes.Object_3.geometry}
                material={customMaterial}
                // rotation={nodes.Object_3.rotation.set(3, 0, 0)}
                // material={materials.lambert1}
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

             {/* side sleeve  */}
             {/* {snap.isSideTexture && (
                <Decal 
                position={[0.26,0.1, 0]}
                rotation={[0, 0, 0]}
                scale={0.15}
                uvScale={[0.3, 0.3]} // You can adjust this if needed
                uvOffset={[1, 1]} // You can adjust this if needed
                map={sideTexture}
                />
            )}  */}


            </mesh>
        </group>

        </>
    
  )
}

export default OverSizedMale