import React from 'react'
import "./Admin.css"
import Sidebar from '../../Components/Sidebar/Sidebar'
// import { Routes,Route } from 'react-router-dom'
// // import AddProduct from '../../Components/AddProduct/AddProduct'
// import AddProduct from "../../Components/AddProduct/AddProduct"

// import ListProduct from '../../Components/ListProduct/ListProduct'
export default function Admin() {
  return (
    <div className='admin'>
      Admin
      <Sidebar/>
     
      {/* <Routes>
        <Route path='/addproduct' element={<AddProduct/>}/>
        <Route path='/listproduct' element={<ListProduct/>}/>
      </Routes> */}

    </div>
  )
}
