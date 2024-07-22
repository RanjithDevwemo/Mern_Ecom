import React, { useContext } from 'react'
import "./ProductDisplay.css"
import star_icon from "../Assets/star_dull_icon.png"
import star_dull_icon from "../Assets/star_dull_icon.png"
import { ShopContext } from '../../Context/ShopContext'
const ProductDisplay = (props) => {
    const {product}=props;
    const {addToCart}=useContext(ShopContext);
  return (
    <div className='productdisplay'>
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
           <img src={product.image} alt="no-image" />
           <img src={product.image} alt="no-image" />
        </div>

        <div className="productdisplay-image">
            <img className='productdisplay-main-img' src={product.image} alt="" />
        </div>

      </div>
      <div className="productdisplay-right">
<h1>{product.name}</h1>
<div className="productdisplay-right-star">
    <img src={star_icon} alt="" />
    <img src={star_icon} alt="" />
    <img src={star_icon} alt="" />
    <img src={star_icon} alt="" />
    <img src={star_dull_icon} alt="" />
   <p>(122)</p>
</div>
<div className="productdisplay-right-prices">
    <div className="productdisplay-right-price-old">${product.old_price}</div>
    <div className="productdisplay-right-price-new">${product.new_price}</div>
</div>

<div className="productdisplay-right-description">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus praesentium, earum ad consectetur repudiandae, suscipit ipsa ducimus hic modi harum quae. A aspernatur 
    culpa possimus velit perspiciatis. Nemo, deserunt veritatis.
</div>
<div className="productdisplay-right-size">
<div className="">S</div>
<div className="">M</div>
<div className="">L</div>
<div className="">XL</div>
<div className="">XXL</div>

</div>
      </div>
      <button onClick={()=>{addToCart(product.id)}}>ADD TO CART</button>
      <p className="productdisplay-right-category"><span>category :</span>dfsdf sdfass</p>
    </div>
  )
}

export default ProductDisplay
