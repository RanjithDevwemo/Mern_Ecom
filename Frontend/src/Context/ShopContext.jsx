

// import React, { createContext, useState } from 'react'
// import { useEffect } from 'react';
// // import all_product from "../assets/Assets/all_product"
// export const ShopContext=createContext(null);



// const getDefaultCart=()=>{
//     let cart={};
//     for (let index = 0; index < 300+1; index++) {
//         cart[index]=0
        
//     }
//     return cart;
// }

// const ShopContextProvider=(props)=>{
//     const [all_product,setAll_product]=useState([]);
//     const [cartItems,setCartItems]=useState(getDefaultCart());


// useEffect(()=>{
//     fetch("http://localhost:4001/allproducts")
//     .then((response)=>response.json())
//     .then((data)=>setAll_product(data))
// },[])

//     const addToCart=(itemId)=>{
//         setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
//         if(localStorage.getItem('auth-token')){
        
//         fetch('http://localhost:4001/addtocart',{
//             method:"POST",
//             headers:{
//                 Accept:"application",
//                 'auth-token':`{localstorage.getItem('auth-token)}`,
//                 'Content-Type':'application/json',
//             },
//             body:JSON.stringify({ "itemId":itemId}),
//         }).then(response=>response.json()).then(data=>console.log(data))
//         .catch((err)=>console.log(err))
//     } 
// }
//     const removeFromCart=(itemId)=>{
//         setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
//     }

//     const getTotalCartAmount=()=>{
//         let totalAmount=0;

//         for(const item in cartItems){
//             if(cartItems[item]>0){
//                 let itemInfo=all_product.find((prduct)=>prduct.id==Number(item))
//                 totalAmount+=itemInfo.new_price*cartItems[item];
//             }
//             return totalAmount;
//         }
//     }

//     const contextvalue={getTotalCartAmount,all_product,cartItems,addToCart,removeFromCart};

//     // console.log(cartItems);

//     return(
//         <ShopContext.Provider value={contextvalue}>
//             {props.children}
//         </ShopContext.Provider>
//     )
// }
  
// export default ShopContextProvider;





import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index <= 300; index++) {
        cart[index] = 0;
    }
    return cart;
}

const ShopContextProvider = (props) => {
    const [all_product, setAll_product] = useState([]);
    const [cartItems, setCartItems] = useState(getDefaultCart());

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:4001/allproducts');
                setAll_product(response.data);
                if (localStorage.getItem('auth-token')) {
                    fetch('http://localhost:4001/getcart',{
                        method:"POST",
                        headers:{
                            Accept:"application/form-data",
                            "auth-token":`${localStorage.getItem("auth-token")}`,
                            "Content-Type":"application/json",
                        },
                        body:"",
                    }).then((response)=>response.json())
                    .then((data)=>setCartItems(data));
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        
        fetchProducts();
    }, []);

    const addToCart = (itemId) => {
        setCartItems(prev => ({ ...prev, [itemId]: prev[itemId] + 1 }));

        if (localStorage.getItem('auth-token')) {
            axios.post('http://localhost:4001/addtocart', { itemId }, {
                headers: {
                    'auth-token': localStorage.getItem('auth-token'),
                    'Content-Type': 'application/json'
                }
            })
            .then(response => console.log(response.data))
            .catch(error => console.error('Error adding to cart:', error));
        }
    }

    const removeFromCart = (itemId) => {
        setCartItems(prev => ({ ...prev, [itemId]: prev[itemId] - 1 }));

        if(localStorage.getItem('auth-token')){
            axios.post('http://localhost:4001/removefromcart', { itemId }, {
                headers: {
                    'auth-token': localStorage.getItem('auth-token'),
                    'Content-Type': 'application/json'
                }
            })
            .then(response => console.log(response.data))
            .catch(error => console.error('Error removing from cart:', error));
        }
    }




    const getTotalCartAmount = ()=>{
        let totalAmount = 0;
        for(const item in cartItems){
            if(cartItems[item] > 0){
                let itemInfo = all_product.find((product)=> product.id === Number(item));
                totalAmount += itemInfo.new_price * cartItems[item]
            }
        }

        return totalAmount;

  }

  const getTotalCartItems = ()=>{
    let totalItem = 0;
    for(const item in cartItems){
        if(cartItems[item] > 0){
            totalItem += cartItems[item];
        }
    }
    return totalItem
  }



    const contextValue = {
        getTotalCartAmount,
        all_product,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartItems
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
}

export default ShopContextProvider;
