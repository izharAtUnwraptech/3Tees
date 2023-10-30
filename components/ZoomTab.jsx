import state from "@store";
import { useState } from "react";
import { useSnapshot } from "valtio";

const ZoomTab = () => {

    const snap = useSnapshot(state);

     // Zoom
     const [sliderZoom, setSliderZoom] = useState(snap.camPos[2]);

     const handleZoom = (e) => {
         setSliderZoom(parseFloat(e.target.value));
         console.log(sliderZoom)
         state.camPos[0] = 0;
         state.camPos[2] = sliderZoom;
     };                    
 
     const handleZoomIncrement = (step) => {
         setSliderZoom(sliderZoom+step);
         state.camPos[0] = 0;
         state.camPos[2] = sliderZoom;
         console.log(sliderZoom)
     }
 
     const handleZoomDecrement = (step) => {
         setSliderZoom(sliderZoom-step);
         state.camPos[0] = 0;
         state.camPos[2] = sliderZoom;  
         console.log(sliderZoom)           
     }


  return (
    <div className="zoom-container flex flex-col order-first">
        <div className="flex-1 glassmorphism p-1 rounded-md">

            {/* Zoom  */}
            <label htmlFor="scale">
                Zoom:
            </label><br/>
            <button 
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-1 mx-1 rounded"
                onClick={() => {handleZoomDecrement(0.1)}}
            >-</button>
            <input
                type="range"
                className="scale"
                min="0.2"
                max="2"
                step="0.1"
                value={sliderZoom}
                onChange={handleZoom}
            />
            <button 
                className="bg-blue-500 hover:bg-blue-700 text-white px-1 mx-1 mb-2 font-bold rounded"
                onClick={() => {handleZoomIncrement(0.1)}}
            >+</button>     
            <br/>

        </div>
    </div>
  )
}

export default ZoomTab