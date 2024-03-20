import React, { useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';
import state from '@store';

const Details = () => {
    const snap = useSnapshot(state);
    const [shirtPrice, setShirtPrice] = useState(0);
    const [offerPrice, setOfferPrice] = useState(0);
    let [FrontLogoPrice, setFrontLogoPrice] = useState(200);
    let [PocketLogoPrice, setPocketLogoPrice] = useState(30);
    let [BackLogoPrice, setBackLogoPrice] = useState(120);
    let [printPrice, setPrintPrice] = useState(0);
    let [totalPrice, setTotalPrice] = useState(0);

    // useEffect(() => {
    //     alert("logo changed");
    // },[snap.isFullTexture,snap.isLogoTexture, snap.isbackTexture]);
                  
    // // Scale useEffect
    useEffect(() => {

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
    }, [snap.logoScale, snap.fullScale, snap.backScale, snap.isLogoTexture, snap.isFullTexture, snap.isbackTexture, snap.isMale, snap.isFemale, snap.isCollored, snap.isOversized]);

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
                        <button className="border rounded-full px-4 py-2 mr-2">XS</button>
                        <button className="border rounded-full px-4 py-2 mr-2">S</button>
                        <button className="border rounded-full px-4 py-2 mr-2">M</button>
                        <button className="border rounded-full px-4 py-2 mr-2">L</button>
                        <button className="border rounded-full px-4 py-2 mr-2">XL</button>
                    </div>
                    <a href="#" className="text-blue-600 ml-4">Size Chart</a>
                </div>

                {/* Add to cart and wishlist buttons */}
                <div className="flex">
                    <button className="bg-black text-white px-6 py-3 rounded-lg mr-4">Add to Cart</button>
                    <button className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg">Add to Wishlist</button>
                </div>
            </div>
        </div>
    );
}

export default Details;
