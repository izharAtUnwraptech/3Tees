import state from '@store';
import { useSnapshot } from 'valtio'


const CustomButton = ({type, title, customStyles, handleClick}) => {

  const snap = useSnapshot(state);

  const getContrastColor = (snapColor) => {

    // Convert color to RGB values
    const rgb = parseInt(snapColor.slice(1), 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >>  8) & 0xff;
    const b = (rgb >>  0) & 0xff;

    // Calculate brightness
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;

    // Define a brightness threshold (you can adjust this value)
    const threshold = 128;

    // If the brightness is above the threshold, it's a light color, return black
    if (brightness > threshold) {
        return '#000000'; // Black
    } else {
        // Otherwise, it's a dark color, return white or any other color you prefer
        return '#ffffff'; // White
    }

  }

  const generateStyle = (type) => {
    if(type === 'filled'){
      return {
        backgroundColor:snap.color,
        color:getContrastColor(snap.color),
      }
    } else if( type === 'outline'){
      return{
        border:'1px solid '+ getContrastColor(snap.color),
        color:getContrastColor(snap.color),
      }
    } else if( type === 'dropdown'){
      
      return null;
    }
  }

  return (
    <button 
    className={`px-2 py-1.5 flex-1 rounded-md ${customStyles}`}
    style={generateStyle(type)}
    onClick={handleClick}
    >
      {title}
    </button>
  )
}

export default CustomButton