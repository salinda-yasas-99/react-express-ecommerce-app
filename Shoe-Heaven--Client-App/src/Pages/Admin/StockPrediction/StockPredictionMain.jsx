import React from 'react'
import './StockPrediction.css'
import Sidebar from '../../../Components/Admin-Dashboard/Sidebar/Sidebar'
import StockPrediction from './StockPrediction'

const StockPredictionMain = () => {
  return (
    <div className='stock-prediction-main'>
        <Sidebar/>
        <div className="listContainer">
           <StockPrediction/>
        </div>
      
    </div>
  )
}

export default StockPredictionMain
