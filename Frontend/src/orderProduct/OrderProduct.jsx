// import { useContext, useState } from 'react';
// import "./orderProduct.css";
// import { ShopContext } from '../Context/ShopContext';
// import remove_icon from "../assets/Assets/cart_cross_icon.png";
// import axios from 'axios';

// const OrderProceed = () => {
//     const { all_product, cartItems, removeFromCart, getTotalCartAmount, getTotalCartItems } = useContext(ShopContext);

//     console.log(getTotalCartItems());

//     const [value,setValue]=useState([]);

//     const [username, setUsername] = useState("");
//     const [userId, setUserId] = useState("");

//     const totalAmount = getTotalCartAmount();
//     const totalItems = getTotalCartItems();

//     const orderConfirm = () => {
//         axios.post("http://localhost:4001/order", {username,userId, totalproduct: totalItems, total: totalAmount })

//             .then((res) => {
//                 // console.log(value);
//                 alert("Success: " + res.data.message);
//             })
//             .catch((err) => {
//                 alert("Error: " + err.response.data.message);
//             });
//     }

//     const Click=()=>{
//     all_product.map((item, i) => {
//         if (cartItems[item.id] > 0)
// setValue(prev => ({ ...prev, [i]: (prev[item] ) }));
//         } )
//     }
//     console.log(value);
//     return (
//         <div>
//             <div className="user-inputs">
//                 <input 
//                     type="text" 
//                     placeholder="Username" 
//                     value={username} 
//                     onChange={(e) => setUsername(e.target.value)} 
//                 />
//                 <input 
//                     type="text" 
//                     placeholder="User ID" 
//                     value={userId} 
//                     onChange={(e) => setUserId(e.target.value)} 
//                 />
//             </div>
//             <div className="productitems-format-main">
//                 <p>Products</p>

//                 <p>Title</p>
//                 <p>Price</p>
//                 <p>Total</p>
//                 <p>Remove</p>
//             </div>
//             <hr />
//             {
//                 all_product.map((item, i) => {
//                     if (cartItems[item.id] > 0) {
//                         // setValue(item);
//                         console.log(item);
//                         return (
//                             <div key={i}>
//                                 <div className="classitems-format productitems-format-main">
//                                     <img src={item.image} className='producticon-product-icon' alt="" />
//                                     <p>Id : {item._id}</p>
//                                     <p>{item.name}</p>
//                                     <p>${item.new_price}</p>
//                                     <button className='productitems-quantity'>{cartItems[item.id]}</button>
//                                     <p>${item.new_price * cartItems[item.id]}</p>
//                                     <img className='productitems-remove-icon' src={remove_icon} onClick={() => removeFromCart(item.id)} alt="" />
//                                 </div>
//                                 <hr />
//                             </div>
//                         );
//                     }
//                     return null;
//                 })
//             }
//             <div className="productitems-down">
//                 <div className="productitems-total">
//                     <h1>Product Totals</h1>
//                     <div className="">
//                         <div className="productitems-total-item">
//                             <p>Subtotal</p>
//                             <p>${getTotalCartAmount()}</p>
//                         </div>
//                         <hr />
//                         <div className="productitems-total-item">
//                             <p>Shipping Fee</p>
//                             <p>Free</p>
//                         </div>
//                         <hr />
//                         <div className="productitems-total-item">
//                             <h3>Total</h3>
//                             <h3>${getTotalCartAmount()}</h3>
//                         </div>
//                         <div className="productitems-total-item">
//                             <button onClick={orderConfirm}>Order Confirm</button>
//                         </div> 
//                         <div className="productitems-total-item">
//                             <button onClick={Click}> Confirm</button>
//                         </div>
//                         <hr />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default OrderProceed;















// import { useContext, useState, useEffect } from 'react';
// import "./orderProduct.css";
// import { ShopContext } from '../Context/ShopContext';
// import remove_icon from "../assets/Assets/cart_cross_icon.png";
// import axios from 'axios';
// import {jwtDecode} from 'jwt-decode';

// const OrderProceed = () => {
//     const { all_product, cartItems, removeFromCart, getTotalCartAmount, getTotalCartItems, authToken } = useContext(ShopContext);

//     const [username, setUsername] = useState("");
//     const [userId, setUserId] = useState("");

//     const totalAmount = getTotalCartAmount();
//     const totalItems = getTotalCartItems();
//     console.log(totalItems);
//     console.log(authToken);
//     var decode1=jwtDecode(authToken);
//     console.log(decode1);
    
    
//     // Decode the token and set username and userId
//     useEffect(() => {
//         if (authToken) {
//             try {
//                 const decodedToken = jwtDecode(authToken);
//                 setUsername(decodedToken.username || ""); // Assuming the token contains a username field
//                 setUserId(decodedToken.userId || ""); // Assuming the token contains a userId field
//             } catch (error) {
//                 console.error('Failed to decode token:', error);
//             }
//         }
//     }, [authToken]);

//     // Create the cart data structure for the API request
//     const createCartData = () => {
//         let cartData = {};
//         all_product.forEach((item) => {
//             if (cartItems[item._id] > 0) {
//                 cartData[item._id] = cartItems[item._id];
//             }
//         });
//         return cartData;
//     };

//     // Handle order confirmation
//     const orderConfirm = async () => {
//         const cartData = createCartData();

//         try {
//             // Send order data to backend
//             const response = await axios.post("http://localhost:4001/order", { 
//                 username, 
//                 userId, 
//                 cartData, 
//                 totalProduct: totalItems, 
//                 totalAmount 
//             });

//             // Notify user of success
//             alert("Success: " + response.data.message);

//             // Optionally, clear the cart or redirect user after successful order
//             // clearCart(); 
//             // history.push('/order-success'); 

//         } catch (err) {
//             // Handle errors
//             const errorMessage = err.response?.data?.error || "Failed to place order";
//             alert("Error: " + errorMessage);
//         }
//     };

//     return (
//         <div>
//             <div className="productitems-format-main">
//                 <p>Products</p>
//                 <p>Title</p>
//                 <p>Price</p>
//                 <p>Quantity</p>
//                 <p>Total</p>
//                 <p>Remove</p>
//             </div>
//             <hr />
//             {all_product.map((item) => {
//                 if (cartItems[item._id] > 0) {
//                     return (
//                         <div key={item._id}>
//                             <div className="classitems-format productitems-format-main">
//                                 <img src={item.image} className='producticon-product-icon' alt={item.name} />
//                                 <p>Stock: {item.stock}</p>
//                                 <p>Id: {item._id}</p>
//                                 <p>{item.name}</p>
//                                 <p>${item.new_price}</p>
//                                 <button className='productitems-quantity'>{cartItems[item._id]}</button>
//                                 <p>${item.new_price * cartItems[item._id]}</p>
//                                 <img 
//                                     className='productitems-remove-icon' 
//                                     src={remove_icon} 
//                                     onClick={() => removeFromCart(item._id)} 
//                                     alt="Remove item" 
//                                 />
//                             </div>
//                             <hr />
//                         </div>
//                     );
//                 }
//                 return null;
//             })}
//             <div className="productitems-down">
//                 <div className="productitems-total">
//                     <h1>Product Totals</h1>
//                     <div>
//                         <div className="productitems-total-item">
//                             <p>Subtotal</p>
//                             <p>${totalAmount}</p>
//                         </div>
//                         <hr />
//                         <div className="productitems-total-item">
//                             <p>Shipping Fee</p>
//                             <p>Free</p>
//                         </div>
//                         <hr />
//                         <div className="productitems-total-item">
//                             <h3>Total</h3>
//                             <h3>${totalAmount}</h3>
//                         </div>
//                         <div className="productitems-total-item">
//                             <button onClick={orderConfirm}>Order Confirm</button>
//                         </div>
//                         <hr />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default OrderProceed;




import { useContext, useState, useEffect } from 'react';
import "./orderProduct.css";
import { ShopContext } from '../Context/ShopContext';
import remove_icon from "../assets/Assets/cart_cross_icon.png";
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

const OrderProceed = () => {
    const { all_product, cartItems, removeFromCart, getTotalCartAmount, getTotalCartItems, authToken } = useContext(ShopContext);

  
    const [userId, setUserId] = useState("");
const decode1=jwtDecode(authToken);
    const totalAmount = getTotalCartAmount();
    const totalItems = getTotalCartItems();

    // Decode the token and set username and userId
    useEffect(() => {
        if (authToken) {
            try {
                const decodedToken = jwtDecode(authToken);
                setUserId(decodedToken.user.id || ""); // Assuming the token contains a userId field
            } catch (error) {
                console.error('Failed to decode token:', error);
            }
        }
    }, [authToken]);

    // Create the cart data structure for the API request
    const createCartData = () => {
        let cartData = {};
        all_product.forEach((item) => {
            if (cartItems[item._id] > 0) {
                cartData[item._id] = cartItems[item._id];
            }
        });
        return cartData;
    };

    // Handle order confirmation
    const orderConfirm = async () => {
        const cartData = createCartData();

        try {
            // Send order data to backend
            const response = await axios.post("http://localhost:4001/order", { 
               
                userId, 
                cartData, 
                totalProduct: totalItems, 
                totalAmount 
            });

            // Notify user of success
            alert("Success: " + response.data.message);
            console.log(cartData);
            

            // Optionally, clear the cart or redirect user after successful order
            // clearCart(); 
            // history.push('/order-success'); 

        } catch (err) {
            // Handle errors
            const errorMessage = err.response?.data?.error || "Failed to place order";
            alert("Error: " + errorMessage);
           console.log("userID ",userId," cartData ",cartData," total ",totalAmount);
           console.log(decode1.user.id , " auth");
           
            
        }
    };

    return (
        <div>
            <div className="productitems-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />
            {all_product.map((item) => {
                if (cartItems[item._id] > 0) {
                    return (
                        <div key={item._id}>
                            <div className="classitems-format productitems-format-main">
                                <img src={item.image} className='producticon-product-icon' alt={item.name} />
                                <p>Stock: {item.stock}</p>
                                <p>Id: {item._id}</p>
                                <p>{item.name}</p>
                                <p>${item.new_price}</p>
                                <button className='productitems-quantity'>{cartItems[item._id]}</button>
                                <p>${item.new_price * cartItems[item._id]}</p>
                                <img 
                                    className='productitems-remove-icon' 
                                    src={remove_icon} 
                                    onClick={() => removeFromCart(item._id)} 
                                    alt="Remove item" 
                                />
                            </div>
                            <hr />
                        </div>
                    );
                }
                return null;
            })}
            <div className="productitems-down">
                <div className="productitems-total">
                    <h1>Product Totals</h1>
                    <div>
                        <div className="productitems-total-item">
                            <p>Subtotal</p>
                            <p>${totalAmount}</p>
                        </div>
                        <hr />
                        <div className="productitems-total-item">
                            <p>Shipping Fee</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className="productitems-total-item">
                            <h3>Total</h3>
                            <h3>${totalAmount}</h3>
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
};

export default OrderProceed;
