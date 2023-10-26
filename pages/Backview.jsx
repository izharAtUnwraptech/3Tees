import React,{ useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSnapshot } from 'valtio';
import config from '@config/config';
import { download } from '@public/assets';
import { downloadCanvasToImage, reader } from '@config/helpers';
import { EditorTabs, FilterTabs, DecalTypes } from '@config/constants';
import { fadeAnimation, slideAnimation } from '@config/motion'; 
import { Tab, AiPicker, ColorPicker, FilePicker, CustomButton } from '@components';
import state from '@store';
import RightTab from '@components/RightTab';
import LogoTab from '@components/LogoTab';
import FullTab from '@components/FullTab';
import BackTab from '@components/BackTab';



const Backview = () => {

  const snap = useSnapshot(state);

  const [activeRightTab, setActiveRightTab] = useState("");
  const [activeFilterTab, setActiveFilterTab] = useState({
    // change these based on our 3 logo designs
    logoShirt: true,
    stylishShirt: false,
    backShirt: true,
  })

  // handle active filter tab
  const handleActiveFilterTab = (tabName) => {
    switch(tabName){
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
        default:
          return null;     
      }
    }

  return (
    <AnimatePresence>

      {snap.back && (
        <>

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
                    tab={tab}
                    handleClick={() => {setActiveRightTab(tab.name)}}
                  />

                ))}

                {/* cancel butt  */}
                <div onClick={() => setActiveRightTab(null)} className="w-3/4 h-3/4">
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
                state.back = false;
                state.view = [0,0,0];
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
              title="Front"
              handleClick={ () => {
                state.back = false;
                state.front = true;
                state.view = [0,0,0];
              }
              }
            />

          </motion.div>

          {/* bottom nav */}
          <motion.div
            className="filtertabs-container w-full"
            {...slideAnimation('up')}
          >
            {FilterTabs.map( (tab) => (
              tab.name === 'backShirt' ? (
                <Tab
                  key={tab.name}
                  tab={tab}
                  isFilterTab
                  isActiveTab={activeFilterTab[tab.name]}
                  handleClick={() => handleActiveFilterTab(tab.name)}
                />
              ) : null
            ))}

          </motion.div>

        </>
      )}


    </AnimatePresence>
  )
}

export default Backview