"use client"

import { getProviders, useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';


const Cart = () => {   
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState([]);
  const [selectedImageIndexes, setSelectedImageIndexes] = useState([]);
  const {data: session} = useSession();
  const [userId, setUserId] = useState(session?.user.id);
  const [totalPrice, setTotalPrice] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [shippingfee, setShippingfee] = useState(50);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showProductEdit, setShowProductEdit] = useState(false);
  
  



  // const userId = session?.user.id;
  // console.log('Seesionssssss : ' + session?.user.id);

  useEffect(() => {

    // console.log('Seesionssssss : ' + session?.user.id);

    const fetchProducts = async () => {
      console.log('Seesionssssss : ' + session?.user.id);

      try {
        const response = await fetch('/api/cart/get/', {
          method: 'POST',
          body: JSON.stringify({
          userid: session.user.id,
          })
      });

      if (response.ok) {
        
        const responseData = await response.json();
        const products = responseData.products;
        const fetcheduser = responseData.user;
        

        // set product data
        const updatedProducts = products.map(product => ({
          userid:session.user.id,
          id: product._id,
          name: product.productname,
          images: [
            product.frontimage,
            product.backimage,
            ...(product.isFrontLogo === "true" ? [product.logoimage] : []),
            ...(product.isPocketLogo === "true" ? [product.pocketlogoimage] : []),
            ...(product.isBackLogo === "true" ? [product.backlogoimage] : [])
          ],
          sizes: [product.size],
          quantity: [parseInt(product.quantity)],
          price: product.totalPrice,
          maxprice: product.shirtPrice,
          colorcode: product.color
        }));

      
      setProducts(updatedProducts);
      setUser(fetcheduser);


        const initialIndexes = products.map(() => 0); // Set initial index to 0 for each product
        setSelectedImageIndexes(initialIndexes);
        
    } else {
        console.log('Product Not Designed');
    }
        
      } catch (error) {
        console.error('Error fetching products by id:', error);
      }
    };

    if(session?.user.id) fetchProducts();

  }, [session,products]);

  
  useEffect(() => {

    const calculateTotalPrice = () => {
          // Initialize totPrice with the current state value of totalPrice
          let totPrice = 0;
      
          // Iterate over each product in the products array
          products.forEach(product => {
              // Convert product.totalPrice to a number using parseFloat or parseInt
              const productPrice = parseFloat(product.price);
              // console.log(productPrice);
              
              // Check if productPrice is a valid number
              if (!isNaN(productPrice)) {
                  // Update totPrice by adding the price of the current product
                  totPrice += productPrice;
              }
          });

          // console.log(totPrice);
      
          // Update the state value of totalPrice
          return totPrice;
      };

    const calculateDiscount = () => {
          // Initialize totPrice with the current state value of totalPrice
          let total = 0;
          // console.log(total);
      
          // Iterate over each product in the products array
          products.forEach(product => {
              // Convert product.totalPrice to a number using parseFloat or parseInt
              const totalCost = parseFloat(product.maxprice);
              // console.log(product.id + " : " + product.maxprice);
              
              // Check if productPrice is a valid number
              if (!isNaN(totalCost)) {
                  // Update totPrice by adding the price of the current product
                  total += totalCost;
              }
          });

          // console.log(total);

          let totalDiscount = total - totalPrice;
      
          // Update the state value of totalPrice
          // console.log(totalDiscount);
          return totalDiscount;
      };


      setTotalPrice(calculateTotalPrice);
      // console.log('total price : ' + totalPrice);
      setDiscountPrice(calculateDiscount);


  },[products]);


  // Delete functions ::::::::::::::: START
  const removeProduct = () => {
    // Show the delete confirmation popup
    setShowDeleteConfirmation(true);
  };

  const handleCancelDelete = () => {
    // Show the delete confirmation popup
    setShowDeleteConfirmation(false);
  };

  const handleDeleteProduct = async (productId) => {

    
    setProducts(prevProducts => prevProducts.filter(product => product.id !== productId));

    try {
      const response = await fetch('/api/cart/delete/', {
        method: 'POST',
        body: JSON.stringify({
        productid: productId,
        })
    });

    if (response.ok) {
      
      const responseData = await response.json();
      console.log(responseData.productid);
      setShowDeleteConfirmation(false);
   
  } else {
      console.log('Product Not Found');
  }
      
    } catch (error) {
      console.error('Error Deleting products by id:', error);
    }

  };

  // Delete functions ::::::::::::::: END


  // Edit functions ::::::::::::::: START

  const editProduct = (pid,psize,pquantity) => {
    // Show the delete confirmation popup
    console.log(`${pid} - ${psize} - ${pquantity}`);
    console.log(typeof(pid));
    console.log(typeof(psize));
    console.log(typeof(pquantity));
    setShowProductEdit(true);                        
  };

  const handleCancelEdit = () => {
    // Show the delete confirmation popup
    setShowProductEdit(false);
  };

  const handleEditSave = async (pid,size,quantity) => {

    try {
      const response = await fetch('/api/cart/edit/', {
        method: 'POST',
        body: JSON.stringify({
        pid: pid,
        size: size,
        quantity: quantity,
        })
    });

    if (response.ok) {

      const responseData = await response.json();
      console.log(responseData.pid);
      setShowProductEdit(false);
      
      
    } else {
        return console.log('Product Not Found');
    }
        
    } catch (error) {
      console.error('Error Deleting products by id:', error);
    }

  }


  // Edit functions ::::::::::::::: END

  const handleImageSelect = (productIndex, index) => {
    setSelectedImageIndexes(prevIndexes => {
      const updatedIndexes = [...prevIndexes];
      updatedIndexes[productIndex] = index;
      return updatedIndexes;
    });
  };

  return (

    <div className="py-4" style={{ backgroundColor: "#f0f2f5" }}>

    {/* Active page status */}
    <div className="flex justify-center items-center">
        <div className="flex flex-col items-center">
            <img
                src="/assets/bag.png"
                alt="Image 1"
                className="mb-1"
                style={{ width: "20px", height: "20px" }} // Adjust width and height as needed
            />
            <div className="w-4 h-0.5 bg-pink-500"></div>
        </div>
        <span className="text-gray-400 mx-4">--------</span>
        <div className="flex flex-col items-center">
            <img
                src="/assets/house.png"
                alt="Image 2"
                className="mb-1"
                style={{ width: "20px", height: "20px" }} // Adjust width and height as needed
            />
            <div className="w-4 h-0.5 bg-pink-500"></div>
        </div>
        <span className="text-gray-400 mx-4">--------</span>
        <div className="flex flex-col items-center">
            <img
                src="/assets/wallet.png"
                alt="Image 3"
                className="mb-1"
                style={{ width: "20px", height: "20px" }} // Adjust width and height as needed
            />
            <div className="w-4 h-0.5 bg-pink-500"></div>
        </div>
      </div>

      {/* profile */}
      {user && 
      // <div class="max-w-md rounded-lg overflow-hidden md:max-w-xl px-2 mx-4">
          <div class="md:flex mx-4">
              <div className="md:flex items-center hidden"> {/* Hide on mobile, show on desktop */}
                  <Image
                      src={session?.user.image}
                      alt="Profile-Photo"
                      width={60}
                      height={60}
                      className="rounded-full"
                  />
              </div>
              <div class="p-4">
                  <div class="tracking-wide text-sm text-red-300 font-semibold">Logged In <span class="uppercase block mt-1 text-lg leading-tight font-medium text-black">{user.username}</span> </div>
                  <h2> </h2>
                  
              </div>
          {/* </div> */}
      </div>}


      {/* Products */}
      <div className="container mx-auto lg:grid lg:grid-cols-2 lg:gap-4">  
        <div>

          {/* If empty cart */}
          {products.length <= 0 && <h1>Products</h1>}
          <h3>NOTES:</h3>
          <p>1. Deleting Products are not as per ID, but the last product is deleted - CHECK WHY</p>
          <p>2. Editing: Edit PRoducts are not being reflected properly, Make sure that after clicking `Done` in edit Modal, the products are updated</p>
          
          {/* If cart is not empty */}
          {products.map((product, productIndex) => (
            <div key={product.id} className="border border-gray-300 rounded-lg p-4 m-4 relative shadow-lg" style={{ backgroundColor: "#c1cad6" }}>
              
          {/* delete pop up */}
          {showDeleteConfirmation && (
              <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
                  <div className="bg-white p-4 rounded-md">
                      <p className="text-lg text-gray-800 mb-4">Are you sure you want to remove the product from cart?</p>
                      <div className="flex justify-center space-x-4">
                          <button className="bg-red-500 text-white px-4 py-2 rounded-md" onClick={() => handleDeleteProduct(product.id)}>Delete</button>
                          <button className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md" onClick={() => handleCancelDelete()}>Cancel</button>
                      </div>
                  </div>
              </div>
            )}

            {/* delete button */}
              <button
                  className="absolute top-0 right-2 text-red-400 transform rotate-45 text-3xl"
                  onClick={() => removeProduct()}
              >
                  +
              </button>

              <div className="flex flex-col lg:flex-row">
                {/* Big selected image */}
                <div className="flex justify-center h-auto max-w-md object-contain rounded-lg p-2">
                  <img
                      src={product.images[selectedImageIndexes[productIndex]]}
                      alt={`Product ${product.id}`}
                      className="w-64 h-64 object-cover rounded-lg shadow-lg"
                      style={{
                          objectFit: 'cover',
                          objectPosition: 'right center',
                          backgroundColor: 'snow',
                      }}
                  />
                </div>             
                
                {/* Product details */}
                <div className="flex flex-col justify-start lg:ml-4">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold" style={{ color: "aliceblue" }}>{product.name}</h3>
                    <div className="flex items-center">
                      <p className="text-sm text-gray-600">Total Cost - {product.price} <span className="text-md text-gray-400 bold"> MRP <span className="text-md line-through text-gray-600 ">&#8377; {product.maxprice}</span> </span> </p>
                    </div>
                  </div>
                  <div className="flex">
                    <p>
                        {product.sizes.map(size => (
                            <span key={size} className="bg-gray-100 px-3 py-1 rounded mr-2">{size}</span>
                        ))}
                    </p>
                    <p>
                        {product.quantity.map(quantity => (
                            <span key={quantity} className="bg-gray-100 px-3 py-1 rounded mr-2">{quantity}</span>
                        ))}
                    </p>

                    {/* edit modal popup */}
                    {showProductEdit && 
                    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
                      <div className="bg-white p-4 rounded-md">
                          <h2 className="text-lg font-bold mb-2">Edit Product</h2>
                          
                          <div className="mb-4">
                              <label htmlFor="sizeSelect" className="mr-2">Size:</label>
                              <select id="sizeSelect" className="bg-gray-100 px-3 py-1 rounded">
                                  <option value="XS">XS</option>
                                  <option value="S">S</option>
                                  <option value="M">M</option>
                                  <option value="L">L</option>
                                  <option value="XL">XL</option>
                              </select>
                          </div>
                          <div className="mb-4">
                              <label htmlFor="quantitySelect" className="mr-2">Quantity:</label>
                              <select id="quantitySelect" className="bg-gray-100 px-3 py-1 rounded">
                                  {[...Array(10).keys()].map(quantity => (
                                      <option key={quantity + 1} value={quantity + 1}>{quantity + 1}</option>
                                  ))}
                              </select>
                          </div>
                          <hr />
                          <div className="flex justify-between mt-2">
                              <button className="bg-indigo-500 text-white px-4 mx-2 py-2 rounded-md hover:bg-indigo-600" onClick={() => {

                                const size = document.getElementById('sizeSelect').value;
                                const quantity = document.getElementById('quantitySelect').value;
                                handleEditSave(product.id,size,quantity);

                                }}>Done</button>
                              <button className="bg-gray-300 text-gray-800 px-4 mx-2 py-2 rounded-md hover:bg-gray-400" onClick={() => {handleCancelEdit()}}>Close</button>
                          </div>
                      </div>
                  </div> }


                  </div>
                  <div className="flex my-2 p-2 justify-start rounded overflow-x-auto overflow-y-hidden" style={{ backgroundColor: "aliceblue"}} >
                  <style>
        {`
            /* Define scrollbar track */
            .custom-scrollbar::-webkit-scrollbar-track {
                background-color: transparent; /* Change this to the desired color of the scrollbar track */
            }

            /* Define scrollbar thumb */
            .custom-scrollbar::-webkit-scrollbar-thumb {
                background-color: #888; /* Change this to the desired color of the scrollbar thumb */
                border-radius: 4px; /* Add rounded corners to the scrollbar thumb */
            }
        `}
    </style>
                    {product.images.map((image, index) => (
                      <img key={index} src={image} alt={`Product ${product.id}`} className={`w-12 h-12 object-cover rounded-lg mr-2 mb-2 cursor-pointer border border-gray-400 ${selectedImageIndexes[productIndex] === index ? 'border-2 border-blue-500' : ''}`} onClick={() => handleImageSelect(productIndex, index)} />
                    ))}
                  </div>
                  <div className="flex">
                    <div class="m-2">
                      <button class="bg-indigo-300 text-white px-4 py-2 rounded-md hover:bg-red-300" onClick={() => {editProduct(product.id,product.sizes,product.quantity)}}>Edit </button>
                    </div>
                    <div class="m-2">
                      <button class="bg-indigo-400 text-white px-4 py-2 rounded-md hover:bg-red-300">Wishlist</button>
                    </div>
                  </div>
                </div>
              </div>
              {/* Image picker */}
            </div>
          ))}
        </div>
        
        {/* Empty grid with left border for desktop */}
          <div className="border-l border-sm border-gray-300 lg:block p-4 m-2">
            <div className="flex justify-between mb-4">
                <div className="text-right font-bold text-xl text-gray-500"><span classname=""> Price Details:</span> </div>
            </div>
            <div className="flex justify-between mb-4 rounded p-2" style={{ backgroundColor: "snow"}}>
                <div className="text-left rounded p-2 w-1/2 sm:w-1/4" style={{ backgroundColor: "#c1cad6"}}><span classname="text-gray-400"> Total:</span> </div>
                <div className="text-left text-md font-bold text-gray-600 p-2"><span> $:{totalPrice}</span> </div>
            </div>
            <div className="flex justify-between mb-4 rounded p-2" style={{ backgroundColor: "snow"}}>
                <div className="text-left rounded p-2 w-1/2 sm:w-1/4" style={{ backgroundColor: "#c1cad6"}}><span classname="text-gray-400">Discount on MRP:</span> </div>
                <div className="text-left text-md font-bold text-gray-600 p-2"><span> $:{discountPrice}</span> </div>
            </div>
            <div className="flex justify-between mb-4 rounded p-2" style={{ backgroundColor: "snow"}}>
                <div className="text-left rounded p-2 w-1/2 sm:w-1/4" style={{ backgroundColor: "#c1cad6"}}><span classname="text-gray-400">Shipping Fee:</span> </div>
                <div className="text-left text-md font-bold text-gray-600 p-2">{products < 1 ? 0 : (<span> $:{shippingfee}</span>)} </div>
            </div>

            {/* <div className="flex justify-between mb-4">
                <div className="text-right"><span classname="text-gray-400"> Coupon Discount:</span> </div>
                <div className="text-left"><span classname="text-gray-400"> $:</span> </div>
            </div> */}


            <hr />
            
            <div className="flex justify-between mt-4 rounded p-2" style={{ backgroundColor: "#c1cad6"}}>
                <div className="text-left rounded p-2 w-1/2 sm:w-1/4" style={{ backgroundColor: "snow"}}><span classname="text-gray-400">Grand Total:</span> </div>
                <div className="text-left text-md font-bold p-2">{products < 1 ? 0 : (<span> $:{totalPrice + shippingfee}</span>)} </div>
            </div>

            <div class="flex mt-4 justify-center items-center">
              <button class="bg-red-400 hover:bg-red-600 text-white font-bold py-2 px-4 rounded w-full">
                  Place Order
              </button>
          </div>






          </div>

      </div>

    </div>
  );
};

export default Cart;
