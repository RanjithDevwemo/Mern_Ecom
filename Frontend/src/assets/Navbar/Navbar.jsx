import React, { useState } from 'react'
import "../Navbar/Navbar.css"
import logo from "../Assets/logo.png";
import cart_icon from "../Assets/cart_icon.png"
import { Link } from 'react-router-dom';

export default function Navbar() {
    const[menu,setMenu]=useState('shop');
  return (
    <div className='navbar'>
     <div className="nav-logo">
         <img src={logo} alt="logo" />
         <p>Logo</p>
     </div>
     <ul className="nav-menu">
        <li onClick={()=>{setMenu('shop')}}><Link to='/' style={{textDecoration:"none"}}>Shop </Link> {menu=='shop'? <hr/>:<></>}</li>
        <li onClick={()=>{setMenu('Men')}}><Link to='/mens' style={{textDecoration:"none"}}> Men </Link>{menu=='Men'? <hr/>:<></>}</li>
        <li onClick={()=>{setMenu('Women')}}> <Link to='/womens' style={{textDecoration:"none"}}>Women </Link>{menu=='Women'? <hr/>:<></>}</li>
        <li onClick={()=>{setMenu('Kid')}}> <Link to='/kids' style={{textDecoration:"none"}}>Kids </Link> {menu=='Kid'? <hr/>:<></>}</li>
     </ul>
<div className="nav-login-cart">
    <button><Link to='/login' style={{textDecoration:"none"}}>Login</Link></button>
    <Link to='/cart' style={{textDecoration:"none"}}>
    <img src={cart_icon} alt="" />
    </Link>
    <div className="nav-cart-count">0</div>
</div>

    </div>
  )
}
