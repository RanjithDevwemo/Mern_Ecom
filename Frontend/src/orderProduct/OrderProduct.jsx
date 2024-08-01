import { useContext, useState } from 'react';
import "./orderProduct.css";
import { ShopContext } from '../Context/ShopContext';
import remove_icon from "../assets/Assets/cart_cross_icon.png";
import axios from 'axios';

const OrderProceed = () => {
    const { all_product, cartItems, removeFromCart, getTotalCartAmount, getTotalCartItems } = useContext(ShopContext);

    const [username, setUsername] = useState("");
    const [userId, setUserId] = useState("");

    const totalAmount = getTotalCartAmount();
    const totalItems = getTotalCartItems();

    const orderConfirm = () => {
        axios.post("http://localhost:4001/order/products", { username, userId, totalproduct: totalItems, total: totalAmount })
            .then((res) => {
                alert("Success: " + res.data.message);
            })
            .catch((err) => {
                alert("Error: " + err.response.data.message);
            });
    }

    return (
        <div>
            <div className="user-inputs">
                <input 
                    type="text" 
                    placeholder="Username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                />
                <input 
                    type="text" 
                    placeholder="User ID" 
                    value={userId} 
                    onChange={(e) => setUserId(e.target.value)} 
                />
            </div>
            <div className="productitems-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />
            {
                all_product.map((item, i) => {
                    if (cartItems[item.id] > 0) {
                        return (
                            <div key={i}>
                                <div className="classitems-format productitems-format-main">
                                    <img src={item.image} className='producticon-product-icon' alt="" />
                                    <p>{item.name}</p>
                                    <p>${item.new_price}</p>
                                    <button className='productitems-quantity'>{cartItems[item.id]}</button>
                                    <p>${item.new_price * cartItems[item.id]}</p>
                                    <img className='productitems-remove-icon' src={remove_icon} onClick={() => removeFromCart(item.id)} alt="" />
                                </div>
                                <hr />
                            </div>
                        );
                    }
                    return null;
                })
            }
            <div className="productitems-down">
                <div className="productitems-total">
                    <h1>Product Totals</h1>
                    <div className="">
                        <div className="productitems-total-item">
                            <p>Subtotal</p>
                            <p>${getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="productitems-total-item">
                            <p>Shipping Fee</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className="productitems-total-item">
                            <h3>Total</h3>
                            <h3>${getTotalCartAmount()}</h3>
                        </div>
                        <div className="productitems-total-item">
                            <button onClick={orderConfirm}>Order Confirm</button>
                        </div>
                        <hr />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderProceed;
