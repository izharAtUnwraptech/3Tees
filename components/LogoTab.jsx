import state from "@store"
import { useEffect, useState } from "react";
import { useSnapshot } from "valtio"
import CustomButton from "./CustomButton";




const LogoTab = () => {

    const snap = useSnapshot(state);

    const [sliderXValue, setSliderXValue] = useState(snap.logoDecalPos[0]);
    const [sliderYValue, setSliderYValue] = useState(snap.logoDecalPos[1]);
    const [sliderZValue, setSliderZValue] = useState(snap.logoDecalPos[2]);
    const [sliderLogoScale, setSliderLogoScale] = useState(snap.logoScale);
    const [sliderRotate, setSliderRotate] = useState(snap.logoRotate[2]);
    
    


    useEffect(() => {
        state.logoDecalPos = [sliderXValue, sliderYValue, sliderZValue];
    
    }, [sliderXValue, sliderYValue, sliderZValue]);

    useEffect(() => {
        state.logoScale = sliderLogoScale;

    },[sliderLogoScale])

    useEffect(() => {
        state.logoRotate[2] = sliderRotate;
    }, [sliderRotate]);

    // Positioning ::::::::::::::::

    const handleSliderXChange = (e) => {
        const value = parseFloat(e.target.value);
        setSliderXValue(value);
    };

    const handleSliderYChange = (e) => {
        const value = parseFloat(e.target.value);
        setSliderYValue(value);
    };

    const handleSliderZChange = (e) => {
        const value = parseFloat(e.target.value);
        setSliderZValue(value);
    };

    const handleIncrement = (axis, step) => {
        switch (axis) {
            case 'x':
                setSliderXValue(prevValue => prevValue + step);
                break;
            case 'y':
                setSliderYValue(prevValue => prevValue + step);
                break;
            case 'z':
                setSliderZValue(prevValue => prevValue + step);
                break;
            default:
                break;
        }
    };

    const handleDecrement = (axis, step) => {
        switch (axis) {
            case 'x':
                setSliderXValue(prevValue => prevValue - step);
                break;
            case 'y':
                setSliderYValue(prevValue => prevValue - step);
                break;
            case 'z':
                setSliderZValue(prevValue => prevValue - step);
                break;
            default:
                break;
        }
    };

    // Scaling

    const handleLogoScaleChange = (e) => {
        const value = parseFloat(e.target.value);
        setSliderLogoScale(value);
    };

    const handleScaleIncrement = (step) => {
        setSliderLogoScale(prevScale => prevScale + step);
    };

    const handleScaleDecrement = (step) => {
        setSliderLogoScale(prevScale => prevScale - step);
    };

   
    // Rotate
    const handleRotate = (e) => {
        const value = parseFloat(e.target.value);
        setSliderRotate(value);
    };

    const handleRotateIncrement = (step) => {
        setSliderRotate(prevRotate => prevRotate + step);
    };

    const handleRotateDecrement = (step) => {
        setSliderRotate(prevRotate => prevRotate - step);
    };

    // setDefault
    const setDefaultVals = () => {
        // update positions
        setSliderXValue(0);
        setSliderYValue(0.04);
        setSliderZValue(0.15);

        // update scale
        setSliderLogoScale(0.25);

        // update rotation
        setSliderRotate(0);
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
                onClick={() => {handleDecrement('x',0.01)}}
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
                onClick={() => {handleIncrement('x',0.01)}}
            >+</button>     
            <br/>


            {/* Y */}
            <label htmlFor="sliderY">
                Y:
            </label>
            <button 
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-1 mx-1 rounded"
                onClick={() => {handleDecrement('y',0.01)}}                                
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
                onClick={() => {handleIncrement('y',0.01)}}
            >+</button>                
            <br/>

            {/* Z testing side sleeve */}
            {/* <span className="text-gray-400 font-size-sm">Only Use For Special Cases</span> <br />              */}
            <label htmlFor="sliderY">
                Z:
            </label>
            <button 
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-1 mx-1 rounded"
                onClick={() => {handleDecrement('z',0.01)}}
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
                onClick={() => {handleIncrement('z',0.01)}}
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
                value={sliderLogoScale}
                onChange={handleLogoScaleChange}
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