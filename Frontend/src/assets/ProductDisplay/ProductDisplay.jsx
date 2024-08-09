// import React, { useContext,useState } from 'react'
// import "./ProductDisplay.css"
// import star_icon from "../Assets/star_dull_icon.png"
// import star_dull_icon from "../Assets/star_dull_icon.png"
// import { ShopContext } from '../../Context/ShopContext'

// const ProductDisplay = (props) => {
//     const {product}=props;
//     console.log(product);
//     const {addToCart}=useContext(ShopContext);
//         const [quantity, setQuantity] = useState(1);
//     // const [val,setVal]=useState([]);

    
//     const Increase=()=>{
//       if (product.stock>quantity) {
//       setQuantity(quantity + 1);
//       }
//     }


//     const Decrease=()=>{
//       if (product.stock>1) {
//         setQuantity(quantity - 1);
//       }

//     }

//   return (
//     <div className='productdisplay'>
//       <div className="productdisplay-left">
//         <div className="productdisplay-img-list">
//            <img src={product.image} alt="no-image" height={200} width={200}/>
//            {/* <img src={product.image} alt="no-image" /> */}
//         </div>

//         <div className="productdisplay-image">
//             <img className='productdisplay-main-img' src={product.image} alt="" height={400} width={400}/>
//         </div>

//       </div>
//       <div className="productdisplay-right">
// <h1>{product.name}</h1>
// <div className="productdisplay-right-star">
//     <img src={star_icon} alt=""  />
//     <img src={star_icon} alt="" />
//     <img src={star_icon} alt="" />
//     <img src={star_icon} alt="" />
//     <img src={star_dull_icon} alt="" />
//    <p>(122)</p>
// </div>
// <div className="productdisplay-right-prices">
//     <div className="productdisplay-right-price-old">${product.old_price}</div>
//     <div className="productdisplay-right-price-new">${product.new_price}</div>
//     <h2>{product.stock}</h2>
// </div>

// <div className="productdisplay-right-description">
//     Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus praesentium, earum ad consectetur repudiandae, suscipit ipsa ducimus hic modi harum quae. A aspernatur 
//     culpa possimus velit perspiciatis. Nemo, deserunt veritatis.
// </div>
// <div className="productdisplay-right-size">
// <div className="">S</div>
// <div className="">M</div>
// <div className="">L</div>
// <div className="">XL</div>
// <div className="">XXL</div>

// </div>
//       </div>

  


//       <button onClick={Decrease} disabled={quantity==1}>-</button>
//       <input type="number" value={quantity} onChange={e=>setQuantity(Number(e.target.value))} min='1' max={product.stock}/>
// <button onClick={Increase} disabled={quantity==product.stock}>+</button>
//       <button onClick={()=>{addToCart(product.id , quantity)}}>ADD TO CART</button>

// {/* <button oncl>-</button> */}

//       <button>Buy Now</button>
//       <p className="productdisplay-right-category"><span>category :</span>dfsdf sdfass</p>
//     </div>
//   )
// }

// export default ProductDisplay







import React, { useContext, useState } from 'react';
import './ProductDisplay.css';
import star_icon from '../Assets/star_icon.png';
import star_dull_icon from '../Assets/star_dull_icon.png';
import { ShopContext } from '../../Context/ShopContext';


const ProductDisplay = (props) => {
    const { product } = props;
    const { addToCart,setCartItems } = useContext(ShopContext);
    const [quantity, setQuantity] = useState(1);

    console.log(product);

    const increaseQuantity = () => {
        if (quantity < product.stock) {
            setQuantity(quantity + 1);
        }
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    return (
        <div className='productdisplay'>
            <div className="productdisplay-left">
                <div className="productdisplay-img-list">
                    <img src={product.image} alt="Product Thumbnail" height={200} width={200} />
                </div>
                <div className="productdisplay-image">
                    <img className='productdisplay-main-img' src={product.image} alt="Main Product" height={400} width={400} />
                </div>
            </div>
            <div className="productdisplay-right">
                <h1>{product.name}</h1>
                <div className="productdisplay-right-star">
                    <img src={star_icon} alt="Star Icon" />
                    <img src={star_icon} alt="Star Icon" />
                    <img src={star_icon} alt="Star Icon" />
                    <img src={star_icon} alt="Star Icon" />
                    <img src={star_dull_icon} alt="Star Dull Icon" />
                    <p>(122)</p>
                </div>
                <div className="productdisplay-right-prices">
                    <div className="productdisplay-right-price-old">${product.old_price}</div>
                    <div className="productdisplay-right-price-new">${product.new_price}</div>
                    <h2>Stock: {product.stock}</h2>
                </div>
                <div className="productdisplay-right-description">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus praesentium, earum ad consectetur repudiandae, suscipit ipsa ducimus hic modi harum quae. A aspernatur culpa possimus velit perspiciatis. Nemo, deserunt veritatis.
                </div>
                <div className="productdisplay-right-size">
                    <div className="">S</div>
                    <div className="">M</div>
                    <div className="">L</div>
                    <div className="">XL</div>
                    <div className="">XXL</div>
                </div>
                <div className="productdisplay-actions">
                    <button onClick={decreaseQuantity} disabled={quantity === 1}>-</button>
                    <input
                        type="number"
                        value={quantity}
                        onChange={e => setQuantity(Math.max(1, Math.min(product.stock, Number(e.target.value)))) 
                            
                        }
                        min="1"
                        max={product.stock}
                    />
                    <button onClick={increaseQuantity} disabled={quantity === product.stock}>+</button>
                    <button onClick={() =>(product.stock>0) ? addToCart(product.id, quantity): alert(" out of stock connot add to cart")}>ADD TO CART</button>
                    <button >Buy Now</button>
                    <p>{product.stock>0 ? <span style={{color:"green"}}>in-stock</span> :<span style={{color:"red"}}>out of stock</span> }</p>
                </div>
                <p className="productdisplay-right-category"><span>Category:</span> {product.category}</p>
            </div>
           
        </div>
    );
}

export default ProductDisplay;
