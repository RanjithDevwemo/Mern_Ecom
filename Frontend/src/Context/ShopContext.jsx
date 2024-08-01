
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
    const [searchTerm, setSearchTerm] = useState('');
    const [products, setProducts] = useState([]);
    const [all_product, setAll_product] = useState([]);
    const [cartItems, setCartItems] = useState(getDefaultCart());

const[quantity,setQuantity]=useState(1)
const[product,setProduct]=useState([]);
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:4001/allproducts');
                setAll_product(response.data);
                setProducts(response.data);
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


    const handleSearchChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        const filtered = products.filter(product =>
          product.name.toLowerCase().includes(value.toLowerCase())
        );
        setAll_product(filtered);
      };

    const addToCart = (itemId,quantity) => {
        // setCartItems(prev => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        setCartItems(prev => ({ ...prev, [itemId]: (prev[itemId] || 0) + quantity }));

        if (localStorage.getItem('auth-token')) {
            axios.post('http://localhost:4001/addtocart', { itemId ,quantity}, {
                headers: {
                    'auth-token': localStorage.getItem('auth-token'),
                    'Content-Type': 'application/json'
                }
            })
            .then(response =>product(response.data))
            .catch(error => console.log('Error adding to cart:', error));
        }
    }



    // const increaseQuantity = () => {
    //     if (quantity < product.stock) {
    //       setQuantity(quantity + 1);
    //     }
    //   };
    
    //   const decreaseQuantity = () => {
    //     if (quantity > 1) {
    //       setQuantity(quantity - 1);
    //     }
    //   };


    const removeFromCart = (itemId) => {
        // setCartItems(prev => ({ ...prev, [itemId]: prev[itemId] - 1 }));

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


  const handleSearchChangeClick=()=>{
handleSearchChange();
  }


    const contextValue = {
        getTotalCartAmount,
        all_product,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartItems,searchTerm, handleSearchChange, handleSearchChangeClick,
        // increaseQuantity,decreaseQuantity
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
}

export default ShopContextProvider;



// import React, { createContext, useState, useEffect } from 'react';
// import axios from 'axios';

// export const ShopContext = createContext(null);

// const getDefaultCart = () => {
//     let cart = {};
//     for (let index = 0; index <= 300; index++) {
//         cart[index] = 0;
//     }
//     return cart;
// }

// const ShopContextProvider = (props) => {
//     const [searchTerm, setSearchTerm] = useState('');
//     const [products, setProducts] = useState([]);
//     const [allProducts, setAllProducts] = useState([]);
//     const [cartItems, setCartItems] = useState(getDefaultCart());

//     useEffect(() => {
//         const fetchProducts = async () => {
//             try {
//                 const response = await axios.get('http://localhost:4001/allproducts');
//                 setAllProducts(response.data);
//                 setProducts(response.data);

//                 if (localStorage.getItem('auth-token')) {
//                     const cartResponse = await fetch('http://localhost:4001/getcart', {
//                         method: 'POST',
//                         headers: {
//                             'Accept': 'application/json',
//                             'auth-token': localStorage.getItem('auth-token'),
//                             'Content-Type': 'application/json',
//                         },
//                         body: JSON.stringify({})
//                     });
//                     const cartData = await cartResponse.json();
//                     setCartItems(cartData);
//                 }
//             } catch (error) {
//                 console.error('Error fetching products:', error);
//             }
//         };
//         fetchProducts();
//     }, []);

//     const handleSearchChange = (event) => {
//         const value = event.target.value;
//         setSearchTerm(value);
//         const filtered = products.filter(product =>
//             product.name.toLowerCase().includes(value.toLowerCase())
//         );
//         setAllProducts(filtered);
//     };

//     const addToCart = (itemId, quantity) => {
//         setCartItems(prev => ({ ...prev, [itemId]: (prev[itemId] || 0) + quantity }));

//         if (localStorage.getItem('auth-token')) {
//             axios.post('http://localhost:4001/addtocart', { productId: itemId, quantity }, {
//                 headers: {
//                     'auth-token': localStorage.getItem('auth-token'),
//                     'Content-Type': 'application/json'
//                 }
//             })
//                 .then(response => {
//                     setCartItems(response.data); // Update local cart items from server
//                 })
//                 .catch(error => console.error('Error adding to cart:', error));
//         }
//     };

//     const removeFromCart = (itemId) => {
//         if (localStorage.getItem('auth-token')) {
//             axios.post('http://localhost:4001/removefromcart', { productId: itemId }, {
//                 headers: {
//                     'auth-token': localStorage.getItem('auth-token'),
//                     'Content-Type': 'application/json'
//                 }
//             })
//                 .then(response => {
//                     setCartItems(response.data); // Update local cart items from server
//                 })
//                 .catch(error => console.error('Error removing from cart:', error));
//         }
//     };

//     const getTotalCartAmount = () => {
//         return Object.keys(cartItems).reduce((total, item) => {
//             const itemInfo = allProducts.find(product => product.id === Number(item));
//             if (itemInfo) {
//                 total += itemInfo.new_price * cartItems[item];
//             }
//             return total;
//         }, 0);
//     };

//     const getTotalCartItems = () => {
//         return Object.values(cartItems).reduce((total, quantity) => total + quantity, 0);
//     };

//     const contextValue = {
//         getTotalCartAmount,
//         allProducts,
//         cartItems,
//         addToCart,
//         removeFromCart,
//         getTotalCartItems,
//         searchTerm,
//         handleSearchChange,
//     };

//     return (
//         <ShopContext.Provider value={contextValue}>
//             {props.children}
//         </ShopContext.Provider>
//     );
// }

// export default ShopContextProvider;
