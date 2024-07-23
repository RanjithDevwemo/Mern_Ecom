
import React, { useState, useEffect } from 'react';
import './ListProduct.css';
import axios from 'axios'; // Import axios

import cross_icon from '../../assets/cross_icon.png';

const ListProduct = () => {
  const [allProducts, setAllProducts] = useState([]);

  // Function to fetch all products
  const fetchInfo = async () => {
    try {
      const response = await axios.get('http://localhost:4001/allproducts');
      if (response.status === 200) {
        setAllProducts(response.data); 
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchInfo();
  }, []);

  // Function to remove a product
  const remove_product = async (id) => {
    try {
      await axios.post('http://localhost:4001/removeproduct', { id });
      fetchInfo(); 
    } catch (error) {
      console.error('Error removing product:', error);
    }
  };

  return (
    <div className='list-product'>
      <h1>All Product List</h1>
      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>

      <div className="listproduct-allproducts">
        <hr />
        {allProducts.map((product, index) => (
          <div className="listproduct-format-main listproduct-format" key={index}>
            <img src={product.image} alt="" className="listproduct-product-image" />
            <p>{product.name}</p>
            <p>$ {product.old_price}</p>
            <p>$ {product.new_price}</p>
            <p>{product.category}</p>
            <img
              src={cross_icon}
              onClick={() => remove_product(product._id)}
              className='listproduct-remove-icon'
              alt="Remove"
            />
          </div>
        ))}
        <hr />
      </div>
    </div>
  );
};

export default ListProduct;
