import React, { useState, useEffect } from 'react';
import axios from 'axios';


import upload_area from '../../assets/upload_area.svg';

export default function UpdateProduct() {

const {productId}=useParams();
  console.log(productId);
  const [image, setImage] = useState(null);
  const [productDetails, setProductDetails] = useState({
    name: '',
    image: '',
    category: 'women',
    new_price: '',
    old_price: '',
    stock: '',
  });


  useEffect(() => {
    // Fetch existing product details
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:4001/getproduct/${productId}`);
        setProductDetails(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [productId]);

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

  const updateProduct = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      let imageUrl = productDetails.image; // Keep existing image if no new image is uploaded

      if (image) {
        // Upload image
        const formData = new FormData();
        formData.append('product', image);

        const imageResponse = await axios.post('http://localhost:4001/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (imageResponse.data.success) {
          imageUrl = imageResponse.data.image_url;
        } else {
          alert('Failed to Upload Image');
          return;
        }
      }

      // Update product
      const updatedProduct = {
        ...productDetails,
        image: imageUrl,
      };

      const response = await axios.put(`http://localhost:4001/updateproduct/${productId}`, updatedProduct, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data.success) {
        alert('Product Updated Successfully');
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
        alert('Failed to Update Product');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="update-product">
      <form onSubmit={updateProduct}>
        <div className="updateproduct-itemfield">
          <p>Product Title</p>
          <input
            value={productDetails.name}
            onChange={changeHandler}
            type="text"
            name="name"
            placeholder="Type here"
          />
        </div>

        <div className="updateproduct-price">
          <div className="updateproduct-itemfield">
            <p>Price</p>
            <input
              value={productDetails.old_price}
              onChange={changeHandler}
              type="text"
              name="old_price"
              placeholder="Type here"
            />
          </div>

          <div className="updateproduct-itemfield">
            <p>Offer Price</p>
            <input
              value={productDetails.new_price}
              onChange={changeHandler}
              type="text"
              name="new_price"
              placeholder="Type here"
            />
          </div>

          <div className="updateproduct-itemfield">
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

        <div className="updateproduct-itemfield">
          <p>Product Category</p>
          <select
            name="category"
            className="update-product-selector"
            value={productDetails.category}
            onChange={changeHandler}
          >
            <option value="women">Women</option>
            <option value="men">Men</option>
            <option value="kid">Kid</option>
          </select>
        </div>

        <div className="updateproduct-itemfield">
          <label htmlFor="file-input">
            <img
              src={image ? URL.createObjectURL(image) : productDetails.image || upload_area}
              alt="Upload Area"
              className="updateproduct-thumbnail-image"
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

        <button className="updateproduct-btn" type="submit">
          Update Product
        </button>
      </form>
    </div>
  );
}
