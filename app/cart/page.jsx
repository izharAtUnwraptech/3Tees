"use client"

import React, { useEffect, useState } from 'react';

const Cart = () => {   
  const [products, setProducts] = useState([]);
  const [selectedImageIndexes, setSelectedImageIndexes] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('api/cart/get');
        const products = await response.json();

        const updatedProducts = products.map(product => ({
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

        const initialIndexes = products.map(() => 0); // Set initial index to 0 for each product
        setSelectedImageIndexes(initialIndexes);

      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const removeProduct = (productId) => {
    setProducts(prevProducts => prevProducts.filter(product => product.id !== productId));
  };


  const handleImageSelect = (productIndex, index) => {
    setSelectedImageIndexes(prevIndexes => {
      const updatedIndexes = [...prevIndexes];
      updatedIndexes[productIndex] = index;
      return updatedIndexes;
    });
  };

  return (
    <div className="container py-8 mx-auto">
      {products.map((product, productIndex) => (
        <div key={product.id} className="border border-gray-200 rounded-lg p-4 mb-4 relative">
          <button className="absolute top-2 right-2 text-gray-600" onClick={() => removeProduct(product.id)}>
            X
          </button>
          <div className="flex flex-col lg:flex-row">
            {/* Big selected image */}
            <div className="flex justify-center w-full h-auto max-w-md object-contain rounded-lg">
  <img
    src={product.images[selectedImageIndexes[productIndex]]}
    alt={`Product ${product.id}`}
    className={`w-${selectedImageIndexes[productIndex] === 0 || selectedImageIndexes[productIndex] === 1 ? '64' : '64'} h-${selectedImageIndexes[productIndex] === 0 || selectedImageIndexes[productIndex] === 1 ? '64' : '76'} object-cover rounded-lg`}
    style={{
      objectPosition: selectedImageIndexes[productIndex] === 0 || selectedImageIndexes[productIndex] === 1 ? 'right top' : 'center',
    }}
  />
</div>


            
            {/* Product details */}
            <div className="flex flex-col justify-start lg:ml-4">
              <div className="mb-4">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <div className="flex items-center">
                  <p className="text-sm text-gray-600">Total Cost - {product.price} <span className="text-md text-gray-400 bold"> MRP <span className="text-md line-through text-gray-600 ">&#8377; {product.maxprice}</span> </span> </p>
                </div>
              </div>
              <div className="flex">
                <select className="bg-gray-100 px-3 py-1 rounded mr-2">                  
                  {product.sizes.map(size => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
                <select className="bg-gray-100 px-3 py-1 rounded">
                  {product.quantity.map(quantity => (
                    <option key={quantity} value={quantity}>{quantity}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          {/* Image picker */}
          <div className="flex justify-center mt-4">
            {product.images.map((image, index) => (
              <img key={index} src={image} alt={`Product ${product.id}`} className={`w-16 h-16 object-cover rounded-lg mr-2 mb-2 cursor-pointer border border-gray-400 ${selectedImageIndexes[productIndex] === index ? 'border-2 border-blue-500' : ''}`} onClick={() => handleImageSelect(productIndex, index)} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cart;
