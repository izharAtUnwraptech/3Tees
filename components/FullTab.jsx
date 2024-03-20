import state from "@store"
import { useEffect, useState } from "react";
import { useSnapshot } from "valtio"
import CustomButton from "./CustomButton";



const FullTab = () => {
    const snap = useSnapshot(state);

    const [sliderXValue, setSliderXValue] = useState(snap.fullDecalPos[0]);
    const [sliderYValue, setSliderYValue] = useState(snap.fullDecalPos[1]);
    const [sliderZValue, setSliderZValue] = useState(snap.fullDecalPos[2]);
    const [sliderFullScale, setSliderFullScale] = useState(snap.fullScale);
    const [sliderRotate, setSliderRotate] = useState(snap.fullRotate[2]);

    useEffect(() => {
        state.fullDecalPos = [sliderXValue, sliderYValue, sliderZValue];
    
    }, [sliderXValue, sliderYValue, sliderZValue]);

    useEffect(() => {
        state.fullScale = sliderFullScale;

    },[sliderFullScale])

    useEffect(() => {
        state.fullRotate[2] = sliderRotate;
    }, [sliderRotate]);


    // Positioning

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

 

    // Scale

    const handleFullScaleChange = (e) => {
        const value = parseFloat(e.target.value);
        setSliderFullScale(value);
    };

    const handleScaleIncrement = (step) => {
        setSliderFullScale(prevScale => prevScale + step);
    };

    const handleScaleDecrement = (step) => {
        setSliderFullScale(prevScale => prevScale - step);
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
        setSliderXValue(0.1);
        setSliderYValue(0.12);
        setSliderZValue(0.1);

        // update scale
        setSliderFullScale(0.05);

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
                max="0.5"
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
                max="0.5"
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
                value={sliderFullScale}
                onChange={handleFullScaleChange}
                />
            <button 
                className="bg-blue-500 hover:bg-blue-700 text-white px-1 mx-1 mb-2 font-bold rounded"
                onClick={() => {handleScaleIncrement(0.01)}}
            >+</button>    
            <br/>

            {/* Rotation  */}
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
                min="-1.7"
                max="5"
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

export default FullTab