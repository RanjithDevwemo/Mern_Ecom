

import { Link } from 'react-router-dom';

function Navbar() {

  return (
    <div className='navbar'>
     <div className="nav-logo">
      <h2>Admin</h2>
     </div>

<div className="search">
   <form action="">
   {/* <input type="text" placeholder='Search Text' onChange={handleSearchChange}  /><IoSearchSharp/> */}
  
   </form>
</div>
<Link to={"/admindashboard"} >Home</Link>


     <div className="nav-login-cart">
      {
         localStorage.getItem('auth-token') ? <button onClick={()=> { localStorage.removeItem('auth-token'); window.location.replace("/login")}}>logout</button> : <Link to={'/login'}><button className="login">Login</button></Link>
      }
        
     
     </div>
    </div>
  )
}

export default Navbar