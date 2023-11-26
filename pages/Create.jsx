import { AnimatePresence, motion } from 'framer-motion';
import { useSnapshot } from 'valtio';
import { useEffect, useState } from "react";
import config from '@config/config';
import state from '@store';
import { download } from '@public/assets';
import { downloadCanvasToImage, reader } from '@config/helpers';
import { DecalTypes, EditorTabs, FilterTabs } from '@config/constants';
import { fadeAnimation, slideAnimation } from '@config/motion';
import { AiPicker, ColorPicker, CustomButton, FilePicker, Tab } from '@components';
import RightTab from '@components/RightTab';
import LogoTab from '@components/LogoTab';
import FullTab from '@components/FullTab';
import BackTab from '@components/BackTab';
import ZoomTab from '@components/ZoomTab';

const Create = () => {

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



    // set gender to render on selection
    const gender = snap.isMale ? "Female" : "Male";


  return (
    <AnimatePresence>

      {snap.front && (
        <>
          {/* left nav */}
          <motion.div
           key="custom"
           className="absolute left-0 top-0 z-10"
           {...slideAnimation('left')}
          >
            <div className="flex items-center min-h-screen">
              <div className="editortabs-container tabs">

                {EditorTabs.map( (tab) => (
                  <Tab 
                    key={tab.name}
                    tab={tab}
                    handleClick={ () => {setActiveEditorTab(tab.name)}}
                  />
                ))}

                {generateTabContent()}

              </div>
            </div>
          </motion.div>

          {/* Right nav */}
          <motion.div
           key="custom"
           className="absolute right-0 top-0 z-10"
           {...slideAnimation('right')}
          >
            <div className="flex items-center min-h-screen">
              <div className="editortabs-container tabs">

                {FilterTabs.map( (tab) => (

                  <RightTab  
                    key={tab.name}
                    isActiveTab={activeFilterTab[tab.name]}
                    tab={tab}
                    handleClick={() => {setActiveRightTab(tab.name)}}
                  />

                ))}

                {/* Zoom butt  */}
                <div title="Zoom" onClick={() => setActiveRightTab('zoom')} className="w-3/4 h-3/4">
                  <img src="/assets/zoomButt.png" alt="Zoom" />
                </div>

                {/* cancel butt  */}
                <div title="Close Filters"  onClick={() => setActiveRightTab(null)} className="w-3/4 h-3/4">
                  <img src="/assets/cancel.png" alt="Cancel" />
                </div>

                {generateRightTabContent()}

                

              </div>
            </div>
          </motion.div>

          {/* intro button */}
          <motion.div 
          className="absolute z-10 top-5 right-24"
          {...fadeAnimation}
          >
            <CustomButton 
              type="filled"
              title="Go Back"
              handleClick={ () => {
                state.intro = true;
                state.front = false;
                
              }}
            />

          </motion.div>

          {/* back button */}
          <motion.div 
          className="absolute z-10 top-5 right-5"
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
            />

          </motion.div>

          {/* Gender button */}
          <motion.div 
          className="absolute z-10 top-5 right-48"
          {...fadeAnimation}
          >
            {snap.isMale ? 
            <CustomButton 
              type="filled"
              title={gender}
              handleClick={ () => {
                state.isMale = false;
              }}
            />
          : <CustomButton 
              type="filled"
              title={gender}
              handleClick={ () => {
                state.isMale = true;
              }}
            />  
          }

          </motion.div>


          {/* Download button */}
          <motion.div 
          className="absolute z-10 top-5 right-72"
          {...fadeAnimation}
          >
          
            <CustomButton 
              type="filled"
              title={'Download'}
              handleClick={ () => {
                state.toDownload = true;
              }}
            />
          
          </motion.div>

          {/* bottom nav */}
          <motion.div
            className="filtertabs-container w-full"
            {...slideAnimation('up')}
          >
            {FilterTabs.map( (tab) => (
              tab.name === 'backShirt' ?
              null :
              <Tab 
                key={tab.name}
                tab={tab}
                isFilterTab
                isActiveTab={activeFilterTab[tab.name]}
                handleClick={() => {handleActiveFilterTab(tab.name)}}
              />
            ))}

          </motion.div>
        </>
      )}


    </AnimatePresence>
  )
}

export default Create