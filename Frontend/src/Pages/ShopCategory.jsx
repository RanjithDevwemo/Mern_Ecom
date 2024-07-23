import React, { useContext } from 'react'
import {ShopContext} from '../Context/ShopContext'
import dropdown_icon from "../assets/Assets/dropdown_icon.png"
import Item from '../assets/Item/Item'

export default function ShopCategory(props) {

    const {all_product}=useContext(ShopContext)
  return (
    <div className='shop-category'>
    
<img src={props.banner} alt="" />

<div className="shopcategory-indexSort">
    <p>
        <span>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit magni porro blanditiis doloremque at aliquam eaque facere repellendus
             eveniet quo, earum dolorem doloribus numquam reprehenderit eos tempore saepe pariatur quis.</span>
    </p>
    <div className="shopcategory-sort">
    sort by <img src={dropdown_icon} alt="" />
    </div>

</div>

<div className="shopcatogory-products">
    {
        all_product.map((item,i)=>{
            if (props.category==item.category) {
                return <Item key={i} id={item.id} name={item.name}  image={item.image} new_price={item.new_price} old_price={item.old_price} />
            }
else{
    return null;
}
        })
    }
</div>

    </div>
  )
}
