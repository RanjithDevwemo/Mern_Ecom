// src/context/ProductContext.js
this is context file
import React, { createContext, useState } from 'react';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      setProducts(response.data);
      setFilteredProducts(response.data); // Initialize filtered products
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  return (
    <ProductContext.Provider value={{ searchTerm, handleSearchChange, filteredProducts, fetchProducts }}>
      {children}
    </ProductContext.Provider>
  );
};


and this is navbar


import React, { useContext, useEffect } from 'react';
import { ProductContext } from '../context/ProductContext';

const NavBar = () => {
  const { searchTerm, handleSearchChange, fetchProducts } = useContext(ProductContext);

  useEffect(() => {
    fetchProducts(); // Fetch products when the component mounts
  }, [fetchProducts]);

  return (
    <nav>
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
    </nav>
  );
};

export default NavBar;



// src/components/ProductList.js
this is display all product show file

import React, { useContext } from 'react';
import { ProductContext } from '../context/ProductContext';

const ProductList = () => {
  const { filteredProducts } = useContext(ProductContext);

  return (
    <div>
      <ul>
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <li key={product._id}>
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p>${product.price}</p>
            </li>
          ))
        ) : (
          <p>No products found</p>
        )}
      </ul>
    </div>
  );
};

export default ProductList;
