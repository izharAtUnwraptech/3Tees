"use client";

import CanvasModel from "@canvas"
import Details from "@components/Details";
import CreateTopNav from "@components/promptopia/CreateTopNav";
import Backview from "@pages/Backview";
import Create from "@pages/Create";
import Intro from "@pages/intro"
import state from "@store"
import { useRef } from "react";
import { useSnapshot } from "valtio"


const Home = () => {

  const snap = useSnapshot(state);

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