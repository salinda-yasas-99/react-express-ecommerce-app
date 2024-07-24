import React from 'react'
import './Hero.css'
import Main_Image from '../../assets/Main_image.png'
const Hero = () => {
  return (
    <div className='hero'>
        <div className="hero-left">
            <h5>walk with confidence</h5>
            <div>
                <div className="shop-icon">
                <h1>Discover Your Next <span>Favourite Pair</span> </h1>
                

                </div>
                
            </div>
        </div>
        <div className="hero-right">
            {/* <img src={Main_Image} alt=""  className='hero-image'/> */}
        </div>
      
    </div>
  )
}

export default Hero
