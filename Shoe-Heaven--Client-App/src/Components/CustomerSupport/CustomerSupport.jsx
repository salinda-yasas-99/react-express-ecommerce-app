import React from 'react'
import { Link } from 'react-router-dom'
import './CustomerSupport.css'
import Inquiry_image from '../../assets/exclusive_image.png'

const CustomerSupport = () => {
  return (
    <div className='customer-support'>
        <div className="customer-support-left">
        <h1>Ask Us Anything</h1>
        
        <p>Welcome to our Inquiry Section! We're here to assist you with any questions or concerns you may have about our products, orders, or services</p>
            <Link to={"/inquiry"} style={{textDecoration:"none"}}>
            <button className='btn-customer-support'>Send Inquiry</button>
            </Link>
        </div>
        <div className="customer-support-right">
            <img src={Inquiry_image} alt="" />
        </div>
      

    </div>
  )
}

export default CustomerSupport
