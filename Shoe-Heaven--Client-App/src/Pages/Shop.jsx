import React from 'react'
import CustomerSupport from '../Components/CustomerSupport/CustomerSupport'
import Hero from '../Components/Hero/Hero'


const Shop = () => {
  return (
    <div className='shop-main' style={{display:'flex',flexDirection:"column",alignItems:"center",gap:"40px"}}>
       <Hero/>
       <CustomerSupport/>
    </div>
  )
}

export default Shop
