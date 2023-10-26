import CustomButton from "./CustomButton"

const AiPicker = () => {
  return (
    <div className="filepicker-container">
     <form>
      <textarea id="imgPrompt" name="prompt" rows="4" cols="12" 
        className="p-2 border border-gray-300 rounded-md glassmorphism"
      ></textarea>
      <br />
      <CustomButton 
        type="filled"
        title="full"
        customStyles={"w-1/2"}
        handleClick={() => alert("get content from textArea")}
      />
    </form>
    </div>
  )
}

export default AiPicker