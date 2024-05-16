"use client";

import CustomButton from '@components/CustomButton';
import Nav from '@components/promptopia/Nav';
import { headContainerAnimation, 
        headContentAnimation, 
        headTextAnimation, 
        slideAnimation } from '@config/motion';
import state from '@store';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';
import { signIn, signOut, useSession, getProviders } from "next-auth/react"
import { useRouter } from 'next/navigation';



const Intro = () => {

    const {data: session} = useSession();
    const [providers, setProviders] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const router = useRouter();

    const snap = useSnapshot(state);

    useEffect(() => {

        const setUpProviders = async () => {
            const response = await getProviders();
            
            setProviders(response)
        }

        setUpProviders();

    }, [])

    const handleSignIn = async (providerId) => {
        try {
            await signIn(providerId);
            // Redirect to the desired page after successful sign-in

        } catch (error) {
            // Handle sign-in error
            console.error('Sign-in error:', error);
        }
    };


    // check session
    const checkSession = () => {

        if (!session) {
            setShowPopup(true);
        
        } else {
        //  go to create page

        state.back = false;
        state.intro = false;
        state.front = true;
        state.create = true;

        }
    }

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
  
                          
  
                           {/* <CustomButton 
                           type="filled"
                           title="Customize It"
                           handleClick={() => {
                              state.back = false;
                              state.intro = false;
                              state.front = true;
                              state.create = true;
                            }}
                           customStyles="w-fit px-4 py-2.5 my-2 font-bold text-sm"
                           />   */}

                <div className="flex">
                    <button className="bg-black text-white px-6 py-3 rounded-lg mr-4" onClick={checkSession}>Customize</button>
                </div>
                            
                      </motion.div>
                  </motion.div>
              </motion.section>
          )}

          {/* POP UP IF NOT SIGNED IN */}
          {showPopup && (
                    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center z-20">
                        <div className="bg-white rounded-lg flex flex-col">
                            <button className="text-gray-600 px-2 py-1 rounded-full self-end font-bold" onClick={() => setShowPopup(false)}>x</button>
                            <div className="px-4">
                            <p className="text-center mb-4">We don't want your work to be erased please sign in to store your dsigns and modification.</p>
                                <div className="flex justify-center mb-4">
                                    {providers && 
                                    Object.values(providers).map(provider => (
                                        <button
                                            key={provider.name}
                                            onClick={() => handleSignIn(provider.id)}
                                            className="black_btn mx-2"
                                        >
                                            Sign In with {provider.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            
                        </div>
                    </div>
            )}
      </AnimatePresence>

  
    )
}

export default Intro