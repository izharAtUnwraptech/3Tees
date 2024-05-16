import { motion } from 'framer-motion';
import { useSnapshot } from 'valtio';
import state from '@store';
import { DecalTypes, EditorTabs, FilterTabs } from '@config/constants';
import { fadeAnimation, slideAnimation } from '@config/motion';
import { AiPicker, ColorPicker, CustomButton, FilePicker, Tab } from '@components';
import LogoTab from '@components/LogoTab';
import FullTab from '@components/FullTab';
import BackTab from '@components/BackTab';
import ZoomTab from '@components/ZoomTab';
import { useState } from 'react';


const CreateTopNav = () => {

    const snap = useSnapshot(state);
  
  const [file,setFile] = useState('');
  const [prompt,setPrompt] = useState('');
  const [generatingImg, setGeneratingImg] = useState(false);

  const [activeEditorTab, setActiveEditorTab] = useState("");
  const [activeFilterTab, setActiveFilterTab] = useState({
    // change these based on our 3 logo designs
    logoShirt: true,
    stylishShirt: false,
    backShirt: true,
  })
  const [activeRightTab, setActiveRightTab] = useState("");


  // show right tab content depending on activeRightTab
    // 3. Right Tab
    const generateRightTabContent = () => {
      switch(activeRightTab) {
        case "logoShirt":
          return <LogoTab />
        case "stylishShirt":
          return <FullTab />
        case "backShirt":
          return <BackTab />
        case "zoom":
          return <ZoomTab />  
        default:
          return null;     
      }
    }

  // show tab content depending upon activeTab
    // 1. editor active atb
    const generateTabContent = () => {
      switch (activeEditorTab) {
        case 'colorpicker':
          return <ColorPicker/>
        case 'aipicker':
          return <AiPicker />;
        case 'filepicker':
          return <FilePicker
            file={file}
            setFile={setFile}
            readFile={readFile}
          />
        default:
          return null;      
      }
    }


    // handleDecals
    const handleDecals = (type,result) => {

      const decalType = DecalTypes[type];
      state[decalType.stateProperty] = result;

      if(!activeFilterTab[decalType.filterTab]){
        handleActiveFilterTab(decalType.filterTab)
      }

    }

    // handle active filter tab
    const handleActiveFilterTab = (tabName) => {
      switch(tabName){
        case "logoShirt":
            state.isLogoTexture = !activeFilterTab[tabName];
          break;
        case "stylishShirt":
            state.isFullTexture = !activeFilterTab[tabName];
          break;
        case "backShirt":
            state.isbackTexture = !activeFilterTab[tabName];
          break;
        default:
          state.isLogoTexture = true;
          state.isFullTexture = false;
          state.isbackTexture = true;
      }

      // after setting state , set the activeFilterTab
      setActiveFilterTab((prevState) => {
        return {
          ...prevState,
          [tabName]: !prevState[tabName],
        }
      })


    }

    // readFile
    const readFile = (type) => {
      reader(file)
        .then((result) => {
          handleDecals(type, result);
          setActiveEditorTab("");
        })
    }





  return (
    
    <>
    {/* <div className="flex justify-center gap-3 md:gap-5 m-2 top-15 z-10 right-0 left-0 p-2 w-full items-center flex-wrap"> */}
    <div className="flex justify-center gap-3 md:gap-5 m-2 z-10 right-0 left-0 p-2 w-full items-center flex-wrap createTopNavClass">
            {/* intro button */}
            <motion.div 
            className=""
            {...fadeAnimation}
            >
              <CustomButton 
                type="filled"
                title="Go Back"
                handleClick={ () => {
                  state.intro = true;
                  state.create = false;
                  state.front = false;
                  
                }}
                customStyles="border-b"
              />

            </motion.div>

            {/* Rotate button */}
            <motion.div 
            className=""
            {...fadeAnimation}
            >
              <CustomButton 
                type="filled"
                title="Rotate"
                handleClick={ () => {
                  state.back = true;
                  state.front = false;
                  state.view = [0,Math.PI,0];
                }
                }
                customStyles="border-b"
              />

            </motion.div>

            {/* dropdown start */}

              {/* Dropdown button and menu */}
              <div className="relative inline-block text-left">
                <button
                  type="button"
                  className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  id="menu-button"
                  aria-expanded={snap.isDropdownOpen}
                  aria-haspopup="true"
                  onClick={() => state.isDropdownOpen = !snap.isDropdownOpen} // Toggle dropdown visibility
                >
                  Products
                  <svg
                    className={`-mr-1 h-5 w-5 text-gray-400 transform transition-transform ${
                      snap.isDropdownOpen ? 'rotate-180' : ''
                    }`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                {/* Dropdown menu */}
                {snap.isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white z-10 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button">
                    <div className="py-1" role="none">
            
                      {/* Male */}
                      <CustomButton 
                        type="dropdown"
                        title="Male Tshirt"
                        handleClick={ () => {
                          state.isMale = true;
                          state.isFemale = false;
                          state.isCollored = false;
                          state.isOversized = false;
                          state.isDropdownOpen = !snap.isDropdownOpen;                    }
                        }
                        customStyles="text-gray-700 block w-full px-4 py-1 text-left text-sm"
                      />

                      {/* Female */}
                      <CustomButton 
                        type="dropdown"
                        title="Female Tshirt"
                        handleClick={ () => {
                          state.isMale = false;
                          state.isFemale = true;
                          state.isCollored = false;
                          state.isOversized = false;  
                          state.isDropdownOpen = !snap.isDropdownOpen;                  }
                        }
                        customStyles="text-gray-700 block w-full px-4 py-1 text-left text-sm"
                      />

                      {/* Collered */}
                      <CustomButton 
                        type="dropdown"
                        title="Collored Tshirt"
                        handleClick={ () => {
                          state.isMale = false;
                          state.isFemale = false;
                          state.isCollored = true;
                          state.isOversized = false; 
                          state.isDropdownOpen = !snap.isDropdownOpen;                   }
                        }
                        customStyles="text-gray-700 block w-full px-4 py-1 text-left text-sm"
                      />

                      {/* Oversized */}
                      <CustomButton 
                        type="dropdown"
                        title="Oversized Tshirt"
                        handleClick={ () => {
                          state.isMale = false;
                          state.isFemale = false;
                          state.isCollored = false;
                          state.isOversized = true;
                          state.isDropdownOpen = !snap.isDropdownOpen;                    }
                        }
                        customStyles="text-gray-700 block w-full px-4 py-1 text-left text-sm"
                      />
                      
                    </div>
                  </div>
                )}
              </div>
              {/* dropdown end */}



            {/* Download button */}
            
          </div>

              </>
  )
}

export default CreateTopNav