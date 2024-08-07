// import { ShopContext } from '../../Context/ShopContext';
import { Link } from "react-router-dom";
import "./CartItems.css"
import { useContext } from 'react';
import remove_icon from '../Assets/cart_cross_icon.png';
import { ShopContext } from "../../Context/ShopContext";

const CartItems = () => {
    const { all_product, cartItems, removeFromCart,getTotalCartAmount } =  useContext(ShopContext);
  return (
    <div>
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {
        all_product.map((item, i)=>{
            if(cartItems[item.id] > 0){
              
                return <div key={i}>
                <div className="" key={i}>
        <div className="classitems-format cartitems-format-main">
            <img src={item.image} className='carticon-product-icon' alt="" />
            <p>{item.name}</p>
            <p>${item.new_price}</p>
            <button className='cartitems-quantity'>{cartItems[item.id]}</button>
            <p>${item.new_price * cartItems[item.id]}</p>
            <img className='cartitems-remove-icon' src={remove_icon} onClick={()=> { removeFromCart(item.id), console.log("first")}} alt="" />
        </div>
        <hr />
      </div>
                </div>
            }
            return null;
        })}

        <div className="cartitems-down">
            <div className="cartitems-total">
                <h1>cart Totals</h1>
                <div className="">
                    <div className="cartitems-total-item">
                        <p>Subtotal</p>
                        <p>${getTotalCartAmount()}</p>
                    </div>
                    <hr />
                    <div className="cartitems-total-item">
                        <p>Shipping Fee</p>
                        <p>Free</p>
                    </div>
                    <hr />
                    <div className="cartitems-total-item">
                        <h3>Total</h3>
                        
                        <h3>${getTotalCartAmount()}</h3>
                    
                    </div>
                    <div className="cartitems-total-item">
                        <h3></h3>
                    <button><Link to={'/order'}> Proceed to order </Link></button>
                    </div>
                </div>
              
            </div>
        </div>
    </div>
  )
}

export default CartItems