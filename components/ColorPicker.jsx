import { SketchPicker } from 'react-color'
import { useSnapshot } from 'valtio'
import state from '@store'

const ColorPicker = () => {

  const snap = useSnapshot(state);

  return (
    <div className="absolute left-full ml-3">
      <SketchPicker 
        color={snap.color}
        disableAlpha
        presetColors={['#FFFFFF', '#cc0000', ' #ffcccc', '#8cd98c', '#39ac39', '#009999', '#ffb84d', '#d9d9d9', '#76E1E1', '#204060', '#333', '#000000', '#800000']}
        onChange={(color) => state.color = color.hex}
      />

    </div>
  )
}

export default ColorPicker