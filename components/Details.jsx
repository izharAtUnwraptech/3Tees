"use client"
import React, { useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';
import state from '@store';
import { signIn, signOut, useSession, getProviders } from "next-auth/react"
import { useRouter } from 'next/navigation';

const Details = () => {
    const snap = useSnapshot(state);
    const [shirtPrice, setShirtPrice] = useState(0);
    const [offerPrice, setOfferPrice] = useState(0);
    let [FrontLogoPrice, setFrontLogoPrice] = useState(200);
    let [PocketLogoPrice, setPocketLogoPrice] = useState(30);
    let [BackLogoPrice, setBackLogoPrice] = useState(120);
    let [printPrice, setPrintPrice] = useState(0);
    let [totalPrice, setTotalPrice] = useState(0);
    const [sizePrice, setSizePrice] = useState(0);

    // useEffect(() => {
    //     alert("logo changed");
    // },[snap.isFullTexture,snap.isLogoTexture, snap.isbackTexture]);
                  
    // // Scale useEffect
    useEffect(() => {

        // set prices fro size double from what expected , this will render half of the price in front end, this is done due to some calculation issues
        const sizePrices = {
            XS: 40,
            S: 80,
            M: 120,
            L: 160,
            XL: 200,
        };

        // Calculate size-based additional price
        const additionalSizePrice = sizePrices[snap.size] || 0;


        // alert(snap.isLogoTexture);
        let calculatedShirtPrice = 0;

        if(snap.isMale){
            calculatedShirtPrice = 600;
        }
        if(snap.isFemale){
            calculatedShirtPrice = 600;
        }
        if(snap.isCollored){
            calculatedShirtPrice = 750;
        }
        if(snap.isOversized){
            calculatedShirtPrice = 950;
        }

        // Add size-based additional price to the calculated shirt price
        calculatedShirtPrice += additionalSizePrice;

        // Calculate offer price
        const calculatedOfferPrice = calculatedShirtPrice * 0.5;

        // Update shirt and offer prices
        setShirtPrice(calculatedShirtPrice);
        setOfferPrice(calculatedOfferPrice);

        // Recalculate prices when any scale value changes
        // Recalculate prices when any scale value changes
        const calculatePrices = () => {
            // Update logo prices
            const newFrontLogoPrice = calculateFrontLogoPrice(snap.logoScale);
            const newPocketLogoPrice = calculatePocketLogoPrice(snap.fullScale);
            const newBackLogoPrice = calculateBackLogoPrice(snap.backScale);

            // Calculate print price using the updated logo prices
            const newPrintPrice = newFrontLogoPrice + newPocketLogoPrice + newBackLogoPrice;

            // Update state with new logo prices
            setFrontLogoPrice(newFrontLogoPrice);
            setPocketLogoPrice(newPocketLogoPrice);
            setBackLogoPrice(newBackLogoPrice);

            // Calculate total price using the updated print price and offer price
            const newTotalPrice = newPrintPrice + offerPrice;

            // Update state with calculated prices
            setPrintPrice(newPrintPrice);
            setTotalPrice(newTotalPrice);
        };

        calculatePrices();
    }, [snap.size, snap.logoScale, snap.fullScale, snap.backScale, snap.isLogoTexture, snap.isFullTexture, snap.isbackTexture, snap.isMale, snap.isFemale, snap.isCollored, snap.isOversized]);

    useEffect(() => {
        // Calculate total price when any of the dependent states change
        const newTotalPrice = offerPrice + printPrice;
        setTotalPrice(newTotalPrice);
    }, [offerPrice, printPrice]);
    

    // Function for calculating front logo price
    function calculateFrontLogoPrice(scale) {
        let logoPrice = 0;
        if (snap.isLogoTexture) {
            const baseScale = 0.25;
            const basePrice = 200;
            const scaleDifference = scale - baseScale;
            const priceIncreasePerScale = 5;
            logoPrice = basePrice + Math.floor(scaleDifference / 0.01) * priceIncreasePerScale;
        }
        return logoPrice;
    }

    // Function for calculating pocket logo price
    function calculatePocketLogoPrice(scale) {
        let logoPrice = 0;
        if (snap.isFullTexture) {
            const baseScale = 0.05;
            const basePrice = 30;
            const scaleDifference = scale - baseScale;
            const priceIncreasePerScale = 5;
            logoPrice = basePrice + Math.floor(scaleDifference / 0.01) * priceIncreasePerScale;
        }
        return logoPrice;
    }

    // Function for calculating back logo price
    function calculateBackLogoPrice(scale) {
        let logoPrice = 0;
        if (snap.isbackTexture) {
            const baseScale = 0.15;
            const basePrice = 120;
            const scaleDifference = scale - baseScale;
            const priceIncreasePerScale = 5;
            logoPrice = basePrice + Math.floor(scaleDifference / 0.01) * priceIncreasePerScale;
        }
        return logoPrice;
    }


    // ADD TO CART :::::::::::::

    // Add To Cart Vars
    const {data: session} = useSession();
    const [providers, setProviders] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [startDownload, setStartDownload] = useState(false);

    const router = useRouter();

    useEffect(() => {

        const setUpProviders = async () => {
            const response = await getProviders();
            
            setProviders(response)
        }

        setUpProviders();

    }, [])

    // add to cart function

    const getProductName = () => {
        if (snap.isMale) {
          return "Men's T-shirt";
        } else if (snap.isFemale) {
          return "Women's T-shirt";
        } else if (snap.isCollored) {
          return "Collored T-shirt";
        } else if (snap.isOversized) {
          return "Oversized T-shirt";
        }
        // Default product name if none of the conditions match
        return 'Generic T-shirt';
      };


    useEffect(() => {
    // Ensure that snap.frontImage is not null or undefined before proceeding
        if (snap.frontImage && snap.backImage && snap.toDownload) {
            // Proceed with sending data to the API
            callToPostApi();
            state.toDownload = false;
        }
    }, [snap.backImage]);


    // Function to send data to the API
    const callToPostApi = async () => {

        const productName = getProductName(snap);
        const quantity = 1; 
        

        try {

            const maxshirtPrice = printPrice + shirtPrice;
            // alert(maxshirtPrice);

        const response = await fetch('/api/cart/', {
            method: 'POST',
            body: JSON.stringify({
            userid: session.user.id,
            frontimage: snap.frontImage,
            backimage: snap.backImage,
            logoimage: snap.logoDecal,
            pocketlogoimage: snap.fullDecal,
            backlogoimage: snap.backDecal,
            productname: productName,
            quantity: quantity,
            size: snap.size,
            totalPrice: totalPrice,
            shirtPrice: maxshirtPrice,
            color:snap.color,
            isFrontLogo:snap.isLogoTexture, 
            isPocketLogo:snap.isFullTexture,
            isBackLogo:snap.isbackTexture,

            })
        });

        if (response.ok) {
            router.push('/');
            // router.push('/cart');
            // alert(snap.toDownload);
            

        } else {
            alert('Product Not Saved');
        }
        } catch (error) {
        console.error("Error Uploading Product: ", error);
        }

    }


    const addToCart = async () => {

        state.toDownload = true;
        
    };


    // check session
    const checkSession = () => {

        if (!session) {
        setShowPopup(true);
        
        } else {
        // Add to cart logic here

        addToCart();

        }
    }

    // Set Size ::::::::::
    const handleSizeChange = (size) => {
        // Update the state with the selected size
        state.size = size;
      };

    

    return (
        <div className="max-w-3xl mt-2 px-4 py-2 mx-auto sm:mx-24">
            <div className="mt-8">
                {/* Shirt Type */}
                {snap.isMale && <h1 className="text-3xl font-semibold mb-4">Men's T-shirt</h1>}
                {snap.isFemale && <h1 className="text-3xl font-semibold mb-4">Women's T-shirt</h1>}
                {snap.isCollored && <h1 className="text-3xl font-semibold mb-4">Collored T-shirt</h1>}
                {snap.isOversized && <h1 className="text-3xl font-semibold mb-4">Oversized T-shirt</h1>}

                {/* Pricing */}
                <div className="items-center mb-4">
                    <p className="text-lg font-semibold mr-2">Total : &#8377; {totalPrice}</p>
                    <br />
                    <p className="text-sm text-gray-600">Printing Cost - {printPrice}</p>
                    <br />
                    <p className="text-sm text-gray-600">Shirt Cost - {offerPrice} <span className="text-md text-gray-400 bold"> MRP <span className="text-md line-through text-gray-600 ">&#8377; {shirtPrice}</span> </span> </p>
                    <p className="text-sm text-gray-600">(Free shipping)</p>
                </div>

                {/* Size selection */}
                <div className="flex items-center mb-4">
                    <span className="mr-2">Select Size:</span>
                    <div className="flex">
                        <button
                            className={`border rounded-full px-4 py-2 mr-2 ${snap.size === 'XS' ? 'bg-red-300 text-white' : ''}`}
                            onClick={() => handleSizeChange('XS')}
                        >
                            XS
                        </button>
                        <button
                            className={`border rounded-full px-4 py-2 mr-2 ${snap.size === 'S' ? 'bg-red-300 text-white' : ''}`}
                            onClick={() => handleSizeChange('S')}
                        >
                            S
                        </button>
                        <button
                            className={`border rounded-full px-4 py-2 mr-2 ${snap.size === 'M' ? 'bg-red-300 text-white' : ''}`}
                            onClick={() => handleSizeChange('M')}
                        >
                            M
                        </button>
                        <button
                            className={`border rounded-full px-4 py-2 mr-2 ${snap.size === 'L' ? 'bg-red-300 text-white' : ''}`}
                            onClick={() => handleSizeChange('L')}
                        >
                            L
                        </button>
                        <button
                            className={`border rounded-full px-4 py-2 mr-2 ${snap.size === 'XL' ? 'bg-red-300 text-white' : ''}`}
                            onClick={() => handleSizeChange('XL')}
                        >
                            XL
                        </button>
                    </div>
                    <a href="#" className="text-blue-600 ml-4">Size Chart</a>
                </div>

                {/* Add to cart and wishlist buttons */}
                <div className="flex">
                    <button className="bg-black text-white px-6 py-3 rounded-lg mr-4" onClick={checkSession} style={{ backgroundColor: "#c1cad6",color:"white"}}>Add to Cart</button>
                    <button className="text-gray-700 px-6 py-3 rounded-lg" style={{border:'1px solid #c1cad6',color:"#c1cad6"}}>Add to Wishlist</button>
                </div>

                {/* POP UP IF NOT SIGNED IN */}
                {showPopup && (
                    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center z-12">
                        <div className="bg-white rounded-lg flex flex-col">
                            <button className="text-gray-600 px-2 py-1 rounded-full self-end font-bold" onClick={() => setShowPopup(false)}>x</button>
                            <div className="px-4">
                            <p className="text-center mb-4">We don't want your work to be erased please sign in to store your dsigns and modification.</p>
                                <div className="flex justify-center mb-4">
                                    {providers && 
                                    Object.values(providers).map(provider => (
                                        <button
                                            key={provider.name}
                                            onClick={() => signIn(provider.id)}
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
            </div>
        </div>
    );
}

export default Details;
