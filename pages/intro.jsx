"use client";

import CustomButton from '@components/CustomButton';
import Nav from '@components/promptopia/Nav';
import { headContainerAnimation, 
        headContentAnimation, 
        headTextAnimation, 
        slideAnimation } from '@config/motion';
import state from '@store';
import { AnimatePresence, motion } from 'framer-motion';
import { useSnapshot } from 'valtio';


const Intro = () => {

    const snap = useSnapshot(state);

    return (

      <AnimatePresence>
        {/* <Nav/> */}
          {snap.intro && (
            
              <motion.section className="home" {...slideAnimation('left')}>

                
                  <motion.header {...slideAnimation('down')}>
                  
                  </motion.header>

                  <motion.div className="home-content" {...headContainerAnimation}>
                      <motion.div {...headTextAnimation}>
                          <h1 className="head-text">
                              Let's <br className="xl:block hidden" /> Do It
                          </h1>
                      </motion.div>
                      <motion.div className="h3" {...headContentAnimation}>
                          <p>Notes:</p>
                          <p>Finish by october end</p>
                          <p>use MeshNormalMaterial for premium 5k tshirt</p>
                          <p>along with premium 5k tshirt give vouchers and crypto cheap coins arround 100 coins for a 10rs</p>
                          <p>use 'map=texture1.jpg' for premium tshirt material</p>
                          <br /><br />
  
                          <h5>24-10-23</h5>
                          <h5>in left side bar add</h5>
                          <p>later - 3. texturte picker</p>
                          <p>4. Ai prebuild Prompts 1. whcih generates image as ijn JsMastery , 2. take in name as argument and generate a uniqueli styles image of the that name which should be readable</p>
                          <p>5. if possible let file upload be once and then store it as in canva and allow to use for any style logo, full or back</p>
  
                          <h5>Right Side-Bar</h5>
                          <p>1. add a div which allows to 1. adjust scale in ratio and in x&y direction</p>
                          <p>2. adjust position</p>
                          <p>select size and quantity to directly add to cart</p> 
  
                          
  
                           <CustomButton 
                           type="filled"
                           title="Customize It"
                           handleClick={() => {
                              state.back = false;
                              state.intro = false;
                              state.front = true;
                              state.create = true;
                            }}
                           customStyles="w-fit px-4 py-2.5 my-2 font-bold text-sm"
                           />  
                            
                      </motion.div>
                  </motion.div>
              </motion.section>
          )}
      </AnimatePresence>

  
    )
}

export default Intro