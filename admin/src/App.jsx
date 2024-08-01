// // import React from 'react'
// // // import NavBar from './Components/NavBar/NavBar'
// // import Admin from './Pages/Admin/Admin'
// // const App = () => {
// //   return (
// //     <div>
// //       {/* <NavBar/> */}

// //       <Admin/>
// //     </div>
// //   )
// // }

// // export default App



import React from 'react';
import { Routes,Route } from 'react-router-dom';
import AdminLogin from './Components/LoginSignup/AdminLogin/AdminLogin';
import AdminSignup from './Components/LoginSignup/AdminSignup/AdminSignup';
// import PrivateRoute from './Components/LoginSignup/PrivateRoute/PrivateRoute';
import Admin from './Pages/Admin/Admin';
import Navbar from './Components/NavBar/NavBar';
import AddProduct from './Components/AddProduct/AddProduct';
import ListProduct from './Components/ListProduct/ListProduct';

function App() {
    return (
   <>
   <Navbar/>
            <Routes>
                <Route path="/login" element={<AdminLogin/>} />
                <Route path="/" element={<AdminSignup/>} />
             {/* <Route path='/private' element={<PrivateRoute/>}> */}
             <Route path='/admindashboard' element={<Admin/>}/>
             <Route path='/addproduct' element={<AddProduct/>}/>
             <Route path='/listproduct' element={<ListProduct/>}/>
             {/* </Route> */}
            </Routes>
            </>
    );
}

export default App;




// import React from 'react';
// import { Routes, Route} from 'react-router-dom';
// import AdminSignup from './Components/LoginSignup/AdminSignup/AdminSignup';

// // import { AuthProvider } from './AuthContext';
// import { AuthProvider } from './Context/AuthContext';
// import Home from './Components/Home/Home';
// // import ProtectedRoute from './ProtectedRoute';
// import ProtectedRoute from './Context/ProdectRoute';

// function App() {
//     return (
//         <AuthProvider>
          
//                 <Routes>
//                     <Route path="/login" component={AdminSignup} />
//                     <ProtectedRoute path="/" exact component={Home} />
//                 </Routes>
          
//         </AuthProvider>
//     );
// }

// export default App;



// // App.js
// import React, { useState } from 'react';

// function App() {
//   // State to hold the value of the input
//   const [inputValue, setInputValue] = useState('');

//   // Function to handle the submit action
//   const handleSubmit = (event) => {
//     event.preventDefault(); // Prevent the default form submission
//     console.log(inputValue); // Log the input value to the console
//   };

//   // Function to handle input change
//   const handleChange = (event) => {
//     setInputValue(event.target.value); // Update state with the new input value
//   };

//   return (
//     <div className="App">
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={inputValue}
//           onChange={handleChange}
//           placeholder="Enter value"
//         />
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// }

// export default App;
