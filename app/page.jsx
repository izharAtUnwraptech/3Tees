"use client";

import CanvasModel from "@canvas"
import Details from "@components/Details";
import CreateTopNav from "@components/promptopia/CreateTopNav";
import Backview from "@pages/Backview";
import Create from "@pages/Create";
import Intro from "@pages/intro"
import state from "@store"
import { useEffect, useRef } from "react";
import { useSnapshot } from "valtio"


const Home = () => {

  const snap = useSnapshot(state);

  // Function to generate a random color
  function setRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    
    state.color = color;
  }

  function setFrontScale() {
    const randomScale = 0.11 + Math.random() * 0.3;
    const xSize =  0.01 + Math.random() * 0.03;

    // state.logoDecalPos[0] = xSize;
    // state.logoDecalPos[1] = xSize;
    // state.logoScale = randomScale;
  }

  useEffect(() => {

    if(snap.intro){
      const changeColor = setInterval(() => {
        setRandomColor();
        setFrontScale();
      }, 1000);
  
      return () => clearInterval(changeColor);
    }
  },[snap.intro]);

  

  return (
    <>
   <Intro />
   <Create />
   <Backview />

    <div className="h-screen">
      <CanvasModel />
      {snap.create && <Details/>}     
    </div>
    </>
  )
}

export default Home