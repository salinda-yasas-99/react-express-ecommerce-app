import React from 'react'
import './Hero.css'
import Main_Image from '../../assets/Main_image.png'
const Hero = () => {
  return (
    <div className='hero'>
        <div className="hero-left">
            <h2>walk with confidence</h2>
            <div>
                <div className="shop-icon">
                <p>Discover Your Next </p>
                <p>Favourite Pair</p>

                </div>
                
            </div>
        </div>
        <div className="hero-right">
            <img src={Main_Image} alt=""  className='hero-image'/>
        </div>
      
    </div>
  )
}

export default Hero
