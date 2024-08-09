import React, { useState } from 'react';
import "./UpdateProduct.css"
import upload_area from '../../assets/upload_area.svg';

export default function AddProduct() {
  const [image, setImage] = useState(null);
  const [productDetails, setProductDetails] = useState({
    name: '',
    image: '',
    category: 'women',
    new_price: '',
    old_price: '',
    stock: '',
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setProductDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const addProduct = async (e) => {
    e.preventDefault(); // Prevent default form submission

    if (!image) {
      alert('Please upload an image.');
      return;
    }

    try {
      // Upload image
      const formData = new FormData();
      formData.append('product', image);

      const imageResponse = await fetch('http://localhost:4001/upload', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: formData,
      });

      const imageData = await imageResponse.json();

      if (imageData.success) {
        const product = {
          ...productDetails,
          image: imageData.image_url,
        };

        // Add product
        const productResponse = await fetch('http://localhost:4001/addproduct', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(product),
        });

        const productData = await productResponse.json();

        if (productData.success) {
          alert('Product Added Successfully');
          setProductDetails({
            name: '',
            image: '',
            category: 'women',
            new_price: '',
            old_price: '',
            stock: '',
          });
          setImage(null); // Clear image preview
        } else {
          alert('Failed to Add Product');
        }
      } else {
        alert('Failed to Upload Image');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="add-product">
      <form onSubmit={addProduct}>
        <div className="addproduct-itemfield">
          <p>Product Title</p>
          <input
            value={productDetails.name}
            onChange={changeHandler}
            type="text"
            name="name"
            placeholder="Type here"
          />
        </div>

        <div className="addproduct-price">
          <div className="addproduct-itemfield">
            <p>Price</p>
            <input
              value={productDetails.old_price}
              onChange={changeHandler}
              type="text"
              name="old_price"
              placeholder="Type here"
            />
          </div>

          <div className="addproduct-itemfield">
            <p>Offer Price</p>
            <input
              value={productDetails.new_price}
              onChange={changeHandler}
              type="text"
              name="new_price"
              placeholder="Type here"
            />
          </div>

          <div className="addproduct-itemfield">
            <p>Product Stock</p>
            <input
              value={productDetails.stock}
              onChange={changeHandler}
              type="number"
              name="stock"
              placeholder="Type here"
            />
          </div>
        </div>

        <div className="addproduct-itemfield">
          <p>Product Category</p>
          <select
            name="category"
            className="add-product-selector"
            value={productDetails.category}
            onChange={changeHandler}
          >
            <option value="women">Women</option>
            <option value="men">Men</option>
            <option value="kid">Kid</option>
          </select>
        </div>

        <div className="addproduct-itemfield">
          <label htmlFor="file-input">
            <img
              src={image ? URL.createObjectURL(image) : upload_area}
              alt="Upload Area"
              className="addproduct-thumbnail-image"
              height={150}
              width={150}
            />
          </label>
          <input
            type="file"
            onChange={imageHandler}
            name="image"
            id="file-input"
            hidden
          />
        </div>

        <button className="addproduct-btn" type="submit">
          Add Product
        </button>
      </form>
    </div>
  );
}
