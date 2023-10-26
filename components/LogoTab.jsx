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


    // Position Y slider
    const [sliderYValue, setSliderYValue] = useState(snap.logoDecalPos[1]);

    const handleSliderYChange = (e) => {
        setSliderYValue(parseFloat(e.target.value));
        state.logoDecalPos[1] = sliderYValue;
    };

    // Position Z slider
    const [sliderZValue, setSliderZValue] = useState(snap.logoDecalPos[2]);

    const handleSliderZChange = (e) => {
        setSliderZValue(parseFloat(e.target.value));
        state.logoDecalPos[2] = sliderZValue;
    };

    // Scale
    const [sliderScale, setSliderScale] = useState(snap.logoScale);

    const handleSliderScale = (e) => {
        setSliderScale(parseFloat(e.target.value));
        state.logoScale = sliderScale;
    };

    // Rotate
    const [sliderRotate, setSliderRotate] = useState(0);

    const handleRotate = (e) => {
        setSliderRotate(parseFloat(e.target.value));
        state.logoRotate[2] = sliderRotate;
    };

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
            <input
                type="range"
                className="slider"
                min="-0.5"
                max="0.1"
                step="0.01"
                value={sliderXValue}
                onChange={handleSliderXChange}
                />
            <br/>


            {/* Y */}
            <label htmlFor="sliderY">
                Y:
            </label>
            <input
                type="range"
                className="slider"
                min="-0.3"
                max="0.18"
                step="0.01"
                value={sliderYValue}
                onChange={handleSliderYChange}
                />
            <br/>

            {/* Z testing side sleeve */}
            <label htmlFor="sliderY">
                Z:
            </label>
            <input
                type="range"
                className="slider"
                min="-0.3"
                max="0.18"
                step="0.01"
                value={sliderZValue}
                onChange={handleSliderZChange}
                />
            <br/>

            {/* SCALE  */}
            <label htmlFor="scale">
                SCALE:
            </label>
            <input
                type="range"
                className="scale"
                min="0.05"
                max="0.45"
                step="0.01"
                value={sliderScale}
                onChange={handleSliderScale}
                />
            <br/>

            {/* Rotation  */}
            <label htmlFor="scale">
                Rotate:
            </label>
            <input
                type="range"
                className="scale"
                min="-1.7"
                max="1.7"
                step="0.1"
                value={sliderRotate}
                onChange={handleRotate}
                />
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