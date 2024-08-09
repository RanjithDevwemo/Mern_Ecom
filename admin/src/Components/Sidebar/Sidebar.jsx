import React from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';
import add_product_icon from '../../assets/Product_Cart.svg';
import list_product_icon from '../../assets/Product_list_icon.svg';
import Total_Products from "../../assets/orders.jpg"

const Slidebar = () => {
  return (
    <div className='sidebar'>
     <Link to={'/addproduct'} style={{textDecoration: "none"}}>
      <div className="sidebar-item">
        <img src={add_product_icon} alt=' ' />
        <p>Add Product</p>
      </div>
     </Link>
     <Link to={'/listproduct'} style={{textDecoration: "none"}}>
      <div className="sidebar-item">
        <img src={list_product_icon} alt=' ' />
        <p>Product List</p>
      </div>
     </Link>


     <Link to={'/totalorders'} style={{textDecoration: "none"}}>
      <div className="sidebar-item">
        <img src={Total_Products} alt=' ' height={50} width={50}/>
        <p>Total Order's</p>
      </div>
     </Link>

    </div>
  )
}

export default Slidebar