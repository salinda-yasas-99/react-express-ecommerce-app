import React from 'react'
import { Link } from 'react-router-dom'
import './CustomerSupport.css'
import Main_Shoe from '../../assets/Main_shoe.png'

const CustomerSupport = () => {
  return (
    <div className='customer-support'>
        <div className="customer-support-left">
        <h3>Ask Us Anything</h3>
        
        <p>Welcome to our Inquiry Section! We're here to assist you with any questions or concerns you may have about our products, orders, or services</p>
            <Link to={"/inquiry"} style={{textDecoration:"none"}}>
            <button className='btn-customer-support'>Send Inquiry</button>
            </Link>
        </div>
        <div className="customer-support-right">
            <img src={Main_Shoe} alt="" />
        </div>
      

    </div>
  )
}

export default CustomerSupport
