"use client"

import { useState } from "react";
import CustomButton from "./CustomButton"
import state from "@store";
import Link from "next/link";



const AiPicker = () => {

  const [formData, setFormData] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e) => {
    setFormData(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/v1/dalle', { 
        method: 'POST',
        body: JSON.stringify({
        promptDesc: formData ,
          // userId: session?.user.id,
        })

      })

      if(response.ok){
        // state.logoDecal = `data:image/png;base64,${data.image}`;
        // state.logoDecal = '/unwrapLogoPng.png';
        console.log(data);
        alert("response recieved")

      }

      // setLogoImage(response.data.photo);
    } catch (error) {
      console.error("Error submitting form:", error);
    }

  };

  return (
    <div className="aipicker-textarea-wide">
     <form onSubmit={handleSubmit}>
      <textarea id="imgPrompt" name="prompt" rows="4" cols="18" 
        className="p-2 border border-gray-300 rounded-md glassmorphism w-100"
        onChange={handleChange}
        value={formData}
      ></textarea>
      <br />
        <button type="submit" className="bg-black text-white p-2 rounded-lg">
          Generate Image
        </button>
    </form>

      {/* <textarea id="imgPrompt" name="prompt" rows="4" cols="18" 
        className="p-2 border border-gray-300 rounded-md glassmorphism w-100"
        placeholder="Partnered with Microsoft Designer, We Help You Gneertae Images Seamlessly Using Microsoft Tools, Steps: 1.Generate Images by Writing Prompt , 2. Download, 3. Upload on UnwrapTech"
        
      ></textarea> */}

      {/* <span  className="p-2 border border-gray-300 rounded-md glassmorphism w-100 text-xs">Partnered with Microsoft Designer, We Help You Genertae Images Seamlessly Using Microsoft Tools <br/><br/> Steps: 1.Generate Images by Writing Prompt , 2. Download, 3. Upload on UnwrapTech</span> */}

    {/* <Link className="bg-black text-white p-2 rounded-lg w-3/4 my-2" href="https://designer.microsoft.com/" target="_blank">Generate Images</Link> */}
    </div>
  )
}

export default AiPicker