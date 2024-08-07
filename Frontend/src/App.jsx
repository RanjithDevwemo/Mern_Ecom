
import Navbar from './assets/Navbar/Navbar'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Shop from './Pages/Shop'
import ShopCategory from './Pages/ShopCategory'
import Product from './Pages/Product'
import Cart from './Pages/Cart'
import LoginSignup from './Pages/LoginSignup'
import men_banner from "./assets/Assets/banner_mens.png"
import women_banner from "./assets/Assets/banner_women.png"
import kid_banner from "./assets/Assets/banner_kids.png"
import OrderProceed from './orderProduct/OrderProduct'
import UserOrder from './assets/UserOrerder/UserOrder'
function App() {


  return (
    <>
    <BrowserRouter>
    <Navbar/>
    <Routes >
      <Route path='/' element={<Shop/>}/>
      <Route path='/mens' element={<ShopCategory  banner={men_banner} category="men" />} />
      <Route path='/womens' element={<ShopCategory banner={women_banner} category="women"/>} />
      <Route path='/kids' element={<ShopCategory banner={kid_banner} category="kid" />} />
      <Route path='/product' element={<Product/>}>
      <Route path=':productId' element={<Product/>}/>
      </Route>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/login' element={<LoginSignup/>}/>
      <Route path='/order' element={<OrderProceed/>}/>
      <Route path='/userorder/:id' element={<UserOrder/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
