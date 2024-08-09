
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
//     const [all_product, setAll_product] = useState([]);
//     const [cartItems, setCartItems] = useState(getDefaultCart());

//     const[userName,setUserName]=useState('')

// const[quantity,setQuantity]=useState(1)
// const[product,setProduct]=useState([]);
//     useEffect(() => {
//         const fetchProducts = async () => {
//             try {
//                 const response = await axios.get('http://localhost:4001/allproducts');
//                 setAll_product(response.data);
//                 setProducts(response.data);
//                 if (localStorage.getItem('auth-token')) {
//                     fetch('http://localhost:4001/getcart',{
//                         method:"POST",
//                         headers:{
//                             Accept:"application/form-data",
//                             "auth-token":`${localStorage.getItem("auth-token")}`,
//                             "Content-Type":"application/json",
//                         },
//                         body:"",
//                     }).then((response)=>response.json())
//                     .then((data)=>setCartItems(data));
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
//           product.name.toLowerCase().includes(value.toLowerCase())
//         );
//         setAll_product(filtered);
//       };

//     const addToCart = (itemId,quantity) => {
//         // setCartItems(prev => ({ ...prev, [itemId]: prev[itemId] + 1 }));
//         setCartItems(prev => ({ ...prev, [itemId]: (prev[itemId] || 0) + quantity }));

//         if (localStorage.getItem('auth-token')) {
//             axios.post('http://localhost:4001/addtocart', { itemId ,quantity}, {
//                 headers: {
//                     'auth-token': localStorage.getItem('auth-token'),
//                     'Content-Type': 'application/json'
//                 }
//             })
//             .then(response =>setProduct(response.data))
//             .catch(error => console.log('Error adding to cart:', error));
//         }
//     }



//     // const increaseQuantity = () => {
//     //     if (quantity < product.stock) {
//     //       setQuantity(quantity + 1);
//     //     }
//     //   };
    
//     //   const decreaseQuantity = () => {
//     //     if (quantity > 1) {
//     //       setQuantity(quantity - 1);
//     //     }
//     //   };


//     const removeFromCart = (itemId) => {
//         // setCartItems(prev => ({ ...prev, [itemId]: prev[itemId] - 1 }));
//         setCartItems(prev => (quantity));

//         if(localStorage.getItem('auth-token')){
//             axios.post('http://localhost:4001/removefromcart', { itemId }, {
//                 headers: {
//                     'auth-token': localStorage.getItem('auth-token'),
//                     'Content-Type': 'application/json'
//                 }
//             })
//             .then(response => console.log(response.data) , window.location.reload())
//             .catch(error => console.error('Error removing from cart:', error));
//         }
//     }




//     const getTotalCartAmount = ()=>{
//         let totalAmount = 0;
//         for(const item in cartItems){
//             if(cartItems[item] > 0){
//                 let itemInfo = all_product.find((product)=> product.id === Number(item));
//                 totalAmount += itemInfo.new_price * cartItems[item]
//             }
//         }

//         return totalAmount;

//   }

//   const getTotalCartItems = ()=>{
//     let totalItem = 0;
//     for(const item in cartItems){
//         if(cartItems[item] > 0){
//             totalItem += cartItems[item];
//         }
//     }
//     return totalItem
//   }


//   const handleSearchChangeClick=()=>{
// handleSearchChange();
//   }


//     const contextValue = {
//         getTotalCartAmount,
//         all_product,
//         cartItems,setCartItems,
//         addToCart,
//         removeFromCart,
//         getTotalCartItems,searchTerm, handleSearchChange, handleSearchChangeClick,
//         // increaseQuantity,decreaseQuantity
//     };

//     return (
//         <ShopContext.Provider value={contextValue}>
//             {props.children}
//         </ShopContext.Provider>
//     );
// }

// export default ShopContextProvider;







import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

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

    const [user_Id,setUser_Id]=useState("");

    const [userName, setUserName] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [product, setProduct] = useState([]);
    const [authToken, setAuthToken] = useState(localStorage.getItem('auth-token') || '');



    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:4001/allproducts');
                setAll_product(response.data);
                setProducts(response.data);
                if (authToken) {
                    fetch('http://localhost:4001/getcart', {
                        method: "POST",
                        headers: {
                            Accept: "application/form-data",
                            "auth-token": authToken,
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({}),
                    }).then(response => response.json())
                      .then(data => setCartItems(data));
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        
        fetchProducts();
    }, [authToken]);


       // Decode the token and set username and userId
       useEffect(() => {
        if (authToken) {
            try {
                const decodedToken = jwtDecode(authToken);
                setUser_Id(decodedToken.user.id || ""); // Assuming the token contains a userId field
            } catch (error) {
                console.error('Failed to decode token:', error);
            }
        }
    }, [authToken]);

    const handleSearchChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        const filtered = products.filter(product =>
            product.name.toLowerCase().includes(value.toLowerCase())
        );
        setAll_product(filtered);
    };

    const addToCart = (itemId, quantity) => {
        setCartItems(prev => ({ ...prev, [itemId]: (prev[itemId] || 0) + quantity }));

        if (authToken) {
            axios.post('http://localhost:4001/addtocart', { itemId, quantity }, {
                headers: {
                    'auth-token': authToken,
                    'Content-Type': 'application/json'
                }
            })
            .then(response => setProduct(response.data),console.log(authToken)
            )
            .catch(error => console.log('Error adding to cart:', error));
        }
    }

    const removeFromCart = (itemId) => {
        setCartItems(prev => ({ ...prev, [itemId]: Math.max((prev[itemId] || 0) - quantity, 0) }));

        if (authToken) {
            axios.post('http://localhost:4001/removefromcart', { itemId }, {
                headers: {
                    'auth-token': authToken,
                    'Content-Type': 'application/json'
                }
            })
            .then(response => console.log(response.data))
            .catch(error => console.error('Error removing from cart:', error));
        }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = all_product.find((product) => product.id === Number(item));
                if (itemInfo) {
                    totalAmount += itemInfo.new_price * cartItems[item];
                }
            }
        }
        return totalAmount;
    }

    //get user's Order data using Id
    useEffect(()=>{
        axios.get("http://localhost:4001/getuserorder/"+user_Id)
        .then(res=>setUserName(res.data))
        .catch(err=>console.log(err)
        )
    },[user_Id])



    const getTotalCartItems = () => {
        let totalItem = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalItem += cartItems[item];
            }
        }
        return totalItem;
    }

    const contextValue = {
        getTotalCartAmount,
        all_product,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartItems,
        searchTerm,
        handleSearchChange,
        authToken,
        user_Id,
        setUser_Id,
        setAuthToken,
        setUserName,
        userName
        // Add additional handlers if needed
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
}

export default ShopContextProvider;


