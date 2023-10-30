import state from "@store"
import { useState } from "react";
import { useSnapshot } from "valtio"
import CustomButton from "./CustomButton";




const LogoTab = () => {

    const snap = useSnapshot(state);

    // Position X slider
    const [sliderXValue, setSliderXValue] = useState(snap.logoDecalPos[0]);

    const handleSliderXChange = (e) => {
        setSliderXValue(parseFloat(e.target.value));
        state.logoDecalPos[0] = sliderXValue;
    };

    const handleXIncrement = (step) => {
        setSliderXValue(sliderXValue+step);
        state.logoDecalPos[0] = sliderXValue;

    }

    const handleXDecrement = (step) => {
        setSliderXValue(sliderXValue-step);
        state.logoDecalPos[0] = sliderXValue;
    }


    // Position Y slider
    const [sliderYValue, setSliderYValue] = useState(snap.logoDecalPos[1]);

    const handleSliderYChange = (e) => {
        setSliderYValue(parseFloat(e.target.value));
        state.logoDecalPos[1] = sliderYValue;
    };

    const handleYIncrement = (step) => {
        setSliderYValue(sliderYValue+step);
        state.logoDecalPos[1] = sliderYValue;

    }

    const handleYDecrement = (step) => {
        setSliderYValue(sliderYValue-step);
        state.logoDecalPos[1] = sliderYValue;
    }

    // Position Z slider
    const [sliderZValue, setSliderZValue] = useState(snap.logoDecalPos[2]);

    const handleSliderZChange = (e) => {
        setSliderZValue(parseFloat(e.target.value));
        state.logoDecalPos[2] = sliderZValue;
    };

    const handleZIncrement = (step) => {
        setSliderZValue(sliderZValue+step);
        state.logoDecalPos[2] = sliderZValue;
    }

    const handleZDecrement = (step) => {
        setSliderZValue(sliderZValue-step);
        state.logoDecalPos[2] = sliderZValue;
    }

    // Scale
    const [sliderScale, setSliderScale] = useState(snap.logoScale);

    const handleSliderScale = (e) => {
        setSliderScale(parseFloat(e.target.value));
        state.logoScale = sliderScale;
    };

    const handleScaleIncrement = (step) => {
        setSliderScale(sliderScale+step);
        state.logoScale = sliderScale;
    }

    const handleScaleDecrement = (step) => {
        setSliderScale(sliderScale-step);
        state.logoScale = sliderScale;
    }

    // Rotate
    const [sliderRotate, setSliderRotate] = useState(0);

    const handleRotate = (e) => {
        setSliderRotate(parseFloat(e.target.value));
        state.logoRotate[2] = sliderRotate;
    };

    const handleRotateIncrement = (step) => {
        setSliderRotate(sliderRotate+step);
        state.logoRotate[2] = sliderRotate;
    }

    const handleRotateDecrement = (step) => {
        setSliderRotate(sliderRotate-step);
        state.logoRotate[2] = sliderRotate;
    }

    // setDefault
    const setDefaultVals = () => {
        // update positions
        state.logoDecalPos = [0,0.04, 0.15];

        // update scale
        state.logoScale = 0.25;

        // update rotation
        state.logoRotate[2] = 0;
    }   

  return (
    <div className="rightlogo-container flex flex-col order-first">
        <div className="flex-1 glassmorphism p-1 rounded-md">

            <h5>Position:</h5>
            {/* X */}
            <label htmlFor="sliderX">
                X:
            </label>
            <button 
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-1 mx-1 rounded"
                onClick={() => {handleXDecrement(0.01)}}
            >-</button>
            <input
                type="range"
                className="slider"
                min="-0.5"
                max="0.1"
                step="0.01"
                value={sliderXValue}
                onChange={handleSliderXChange}
            />
            <button 
                className="bg-blue-500 hover:bg-blue-700 text-white px-1 mx-1 mb-2 font-bold rounded"
                onClick={() => {handleXIncrement(0.01)}}
            >+</button>     
            <br/>


            {/* Y */}
            <label htmlFor="sliderY">
                Y:
            </label>
            <button 
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-1 mx-1 rounded"
                onClick={() => {handleYDecrement(0.01)}}
            >-</button>
            <input
                type="range"
                className="slider"
                min="-0.3"
                max="0.18"
                step="0.01"
                value={sliderYValue}
                onChange={handleSliderYChange}
                />
            <button 
                className="bg-blue-500 hover:bg-blue-700 text-white px-1 mx-1 mb-2 font-bold rounded"
                onClick={() => {handleYIncrement(0.01)}}
            >+</button>                
            <br/>

            {/* Z testing side sleeve */}
            <label htmlFor="sliderY">
                Z:
            </label>
            <button 
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-1 mx-1 rounded"
                onClick={() => {handleZDecrement(0.01)}}
            >-</button>
            <input
                type="range"
                className="slider"
                min="-0.3"
                max="0.18"
                step="0.01"
                value={sliderZValue}
                onChange={handleSliderZChange}
                />
            <button 
                className="bg-blue-500 hover:bg-blue-700 text-white px-1 mx-1 mb-2 font-bold rounded"
                onClick={() => {handleZIncrement(0.01)}}
            >+</button>                
            <br/>
            <hr/>

            {/* SCALE  */}
            <label htmlFor="scale">
                Scale:
            </label>
            <br/>
            <button 
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-1 mx-1 rounded"
                onClick={() => {handleScaleDecrement(0.01)}}
            >-</button>
            <input
                type="range"
                className="scale"
                min="0.05"
                max="0.45"
                step="0.01"
                value={sliderScale}
                onChange={handleSliderScale}
                />
            <button 
                className="bg-blue-500 hover:bg-blue-700 text-white px-1 mx-1 mb-2 font-bold rounded"
                onClick={() => {handleScaleIncrement(0.01)}}
            >+</button>
            <br/>

            {/* Rotate  */}
            <label htmlFor="scale">
                Rotate:
            </label><br/>
            <button 
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-1 mx-1 rounded"
                onClick={() => {handleRotateDecrement(0.1)}}
            >-</button>
            <input
                type="range"
                className="scale"
                min="0.2"
                max="2"
                step="0.1"
                value={sliderRotate}
                onChange={handleRotate}
            />
            <button 
                className="bg-blue-500 hover:bg-blue-700 text-white px-1 mx-1 mb-2 font-bold rounded"
                onClick={() => {handleRotateIncrement(0.1)}}
            >+</button>     
            <br/>

            <br/>


            <CustomButton 
            type="filled"
            title="Default"
            handleClick={setDefaultVals}
            customeStles="text-xs"
            />
        </div>

        
    </div>
  )
}

export default LogoTab