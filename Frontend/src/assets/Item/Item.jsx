import React from 'react'
import "../Item/Item.css"
import { Link } from 'react-router-dom'

export default function Item(props) {
  return (
    <div className='item'>
      <Link to={`/product/${props.id}`}>
      <img src={props.image} alt="" height={300} width={300}/>
      </Link>

      <p>{props.name}</p>

      <div className="item-prices">
<div className="item-prices-new">
${props.new_price}
</div>
<div className="item-price-old">
<del> ${props.old_price}</del>
</div>

      </div>

    </div>
  )
}
