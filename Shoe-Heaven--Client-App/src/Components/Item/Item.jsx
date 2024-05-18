import React from 'react'
import './Item.css'
import { Link } from 'react-router-dom'
// import { Link } from 'react-router-dom'

const Item = (props) => {
  return (
    <div className='item'>
      <Link to={`/product/${props.prodId}`}> <img src={props.imageUrl} alt="" /> </Link>
      <p>{props.name}</p>
      <div className="item-prices">
        <div className="item-price-new">
            Rs.{props.new_price}
        </div>
        <div className="item-price-old">
            Rs.{props.old_price}
        </div>
      </div>
    </div>
  )
}

export default Item
