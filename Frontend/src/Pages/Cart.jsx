import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import remove_icon from "../assets/Assets/cart_cross_icon.png"
export default function Cart() {
  const {getTotalCartAmount,all_product,cartItems,removeFromCart}=useContext(ShopContext);
  return (
    <div className='cartitems'>
     <div className="cartitems-format-main">
      <p>products</p>
      <p>title</p>
      <p>price</p>
      <p>Quantity</p>
      <p>Total</p>
      <p>Remove</p>
      <hr />
     {all_product.map((e)=>{
      if (cartItems[e.id]>0) {
        return <>
         <div className="">
        <div className="cartitems-format">
          <img src={e.image} alt="" className='carticon-product-icon'/>
          <p>{e.name}</p>
          <p>${e.new_price}</p>
          <button className='cartitems-quantity'>{cartItems[e.id]}</button>
          <p>{e.new_price*cartItems[e.id]}</p>
          <img src={remove_icon} onClick={()=>{removeFromCart(e.id)}} alt="" />
        </div>
        <hr />
      </div>
        </>
      }
      return null;
     })}
     <div className="cartitems-down">
      <div className="cartitems-total">
        <h1>cart Totals</h1>
        <div className="">
          <div className="cartitems-total-item">
            <p>subtotal</p>
            <p>${0}</p>
          </div>
          <hr />
          <div className="cartitems-total-items">
            <p>Shipping Fee</p>
            <p>fee</p>

          </div>
          <hr />
          <div className="cartitems-total-item">
            <h3>Total</h3>
            <h3>{getTotalCartAmount}</h3>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt, voluptatibus ratione saepe excepturi omnis optio praesentium aspernatur vero ea cumque totam officiis porro esse. Libero sit iste fuga voluptates placeat.
          </div>
        </div>
      </div>
     </div>
     </div>


    </div>
  )
}
