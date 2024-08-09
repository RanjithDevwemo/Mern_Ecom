// import axios from 'axios';
// import { useContext, useState,useEffect } from 'react';
// import './Navbar.css';
// import logo from "../Assets/logo.png";
// import cart_icon from "../Assets/cart_icon.png"
// import { Link } from 'react-router-dom';
// import { IoSearchSharp } from "react-icons/io5";
// import { ShopContext } from '../../Context/ShopContext';

// function Navbar() {
// const[userVal,setUserVal]=useState("");
//    // const [search,setSearch]=useState("");
//     const [menu, setMenu] = useState("shop");
//     const { getTotalCartItems, handleSearchChange ,handleSearchChangeClick,user_Id,userName,setUserName} = useContext(ShopContext);


//     console.log(user_Id);
//     console.log(userName);
    

//     useEffect(()=>{
//       axios.get("http://localhost:4001/getuserorder/"+user_Id)
//       .then(res=>setUserVal(res.data))
//       .catch(err=>console.log(err)
//       )
//   },[user_Id])

// console.log(userVal.userName);


//   return (
//     <div className='navbar'>
//      <div className="nav-logo">
//         <img src={logo} alt="" />
//      </div>

//      <ul className="nav-menu"  >
//         <li onClick={()=>{setMenu('shop')}}> <Link style={{textDecoration: 'none'}}  to={'/'}>Shop</Link>{menu === 'shop' ? <hr /> : <></>}</li>
//         <li onClick={()=>{setMenu('mens')}}><Link style={{textDecoration: 'none'}} to={'/mens'}>Men </Link>{menu === 'mens' ? <hr /> : <></>}</li>
//         <li onClick={()=>{setMenu('womens')}}> <Link style={{textDecoration: 'none'}} to={'/womens'}>Women</Link>{menu === 'womens' ? <hr /> : <></>}</li>
//         <li onClick={()=>{setMenu('kids')}}> <Link style={{textDecoration: 'none'}} to={'/kids'}>Kids</Link>{menu === 'kids' ? <hr /> : <></>}</li>
//      </ul>
// <div className="search">
//    <form action="">
//    <input type="text" placeholder='Search Text' onChange={handleSearchChange}  /><IoSearchSharp onClick={handleSearchChangeClick}/>
  
//    </form>
// </div>
// <ul className="nav-menu"  >
// <li onClick={()=>{setMenu('orders')}}> <Link style={{textDecoration: 'none'}}  to={'/'}>Orders {user_Id}</Link>{menu === 'orders' ? <hr /> : <></>}</li>
// </ul>

//      <div className="nav-login-cart">
//       {
//          localStorage.getItem('auth-token') ? <button onClick={()=> { localStorage.removeItem('auth-token'); window.location.replace("/login")}}><span>{userName.userName}</span> logout</button> : <Link to={'/login'}><button className="login">Login</button></Link>
//       }
        
//        <Link to={'/cart'}> <img src={cart_icon} alt="" /></Link>
//         <div className="nav-cart-count">
//             {getTotalCartItems()}
//         </div>
//      </div>
//     </div>
//   )
// }

// export default Navbar




import axios from 'axios';
import { useContext, useState, useEffect } from 'react';
import './Navbar.css';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import { Link } from 'react-router-dom';
import { IoSearchSharp } from 'react-icons/io5';
import { ShopContext } from '../../Context/ShopContext';

function Navbar() {
  // const [userVal, setUserVal] = useState(null);
  const[user,setUser]=useState("");
  const [menu, setMenu] = useState('shop');
  const { getTotalCartItems, handleSearchChange, handleSearchChangeClick, user_Id, userName, setUserName } = useContext(ShopContext);



  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const response = await axios.get(`http://localhost:4001/getname/${user_Id}`);
        setUser(response.data); // Assuming response.data contains the user's name
      } catch (err) {
        console.error('Error fetching user name:', err);
    
      }
    };

    if (user_Id) {
      fetchUserName();
    }
  }, [user_Id]);



  return (
    <div className='navbar'>
      <div className="nav-logo">
        <img src={logo} alt="Logo" />
      </div>

      <ul className="nav-menu">
        <li onClick={() => setMenu('shop')}>
          <Link to='/' style={{ textDecoration: 'none' }}>Shop</Link>
          {menu === 'shop' && <hr />}
        </li>
        <li onClick={() => setMenu('mens')}>
          <Link to='/mens' style={{ textDecoration: 'none' }}>Men</Link>
          {menu === 'mens' && <hr />}
        </li>
        <li onClick={() => setMenu('womens')}>
          <Link to='/womens' style={{ textDecoration: 'none' }}>Women</Link>
          {menu === 'womens' && <hr />}
        </li>
        <li onClick={() => setMenu('kids')}>
          <Link to='/kids' style={{ textDecoration: 'none' }}>Kids</Link>
          {menu === 'kids' && <hr />}
        </li>
      </ul>

      <div className="search">
        <form>
          <input
            type="text"
            placeholder='Search Text'
            onChange={handleSearchChange}
          />
          <IoSearchSharp onClick={handleSearchChangeClick} />
        </form>
      </div>

      <ul className="nav-menu">
        <li onClick={() => setMenu('userorder')}>
          <Link to={`/userorder/${user_Id}`} style={{ textDecoration: 'none' }}>myOrders </Link>
          {menu === 'userorder' && <hr />}
        </li>
      </ul>

      <div className="nav-login-cart">
        {localStorage.getItem('auth-token') ? (
          <button onClick={() => {
            localStorage.removeItem('auth-token');
            window.location.replace("/login");
          }}>
            <span>{user}</span> logout
          </button>
        ) : (
          <Link to='/login'>
            <button className="login">Login</button>
          </Link>
        )}

        <Link to='/cart'>
          <img src={cart_icon} alt="Cart Icon" />
        </Link>
        <div className="nav-cart-count">
          {getTotalCartItems()}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
