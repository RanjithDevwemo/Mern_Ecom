import React, { useState } from 'react'
import "./AddProduct.css"
import upload_area from "../../assets/upload_area.svg"


export default function AddProduct() {
    const[image,setImage]=useState(false);
    const[productDetails,setProductDetails]=useState({
        name:'',
        image:"",
        category:"women",
        new_price:"",
        old_price:""
    })

    const changeHandler=(e)=>{
        setProductDetails({...productDetails,[e.target.name]:e.target.value})
    }

    const imageHandler=(e)=>{
        setImage(e.target.files[0]);
    }

const Add_Product=async(e)=>{
// console.log(productDetails);
let responseData;
let product=productDetails;

let formData=new FormData();
formData.append('product',image);

await fetch("http://localhost:4001/upload",{
    method:"POST",
    headers:{
        Accept:'application/json',
    },
    body:formData,
}).then((res)=>res.json()).then((data)=>{responseData=data})
if(responseData.success){
    product.image=responseData.image_url;
    console.log(product);
    await fetch('http://localhost:4001/addproduct',{
        method:"POST",
        headers:{
            Accept:'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify(product),
    }).then((res)=>res.json()).then((data)=>{ data.success? alert("Product Added"):alert("Failled")})
}

}

  return (
    <div className='add-product'>
      <div className="addproduct-itemfield">
        <p>Product Title</p>
        <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='type here' />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
            <p>price</p>
            <input value={productDetails.old_price} onChange={changeHandler} type="text" name='old_price' placeholder='type here' />
        </div>

        <div className="addproduct-itemfield">
            <p>Offer price</p>
            <input value={productDetails.new_price} onChange={changeHandler} type="text" name='new_price' placeholder='type here' />
        </div>

      </div>
      <div className="addproduct-itemfield">
        <p>Product Category</p>
        <select name="category" className='add-product-selector' value={productDetails.category} onChange={changeHandler}>
            <option value="women">Women</option>
            <option value="men">men</option>
            <option value="kid">kid</option>
        </select>
      </div>

<div className="addproduct-itemfield">
    <label htmlFor="file-input">
        <img src={image ? URL.createObjectURL(image):upload_area}  alt="" className='addproduct-thumnail-imag' height={150} width={150} />
    </label>
    <input type="file" onChange={imageHandler} name='image' id='file-input' hidden />
</div>
<button className='addproduct-btn' type='submit' onClick={Add_Product} >Add</button>
    </div>
  )
}
