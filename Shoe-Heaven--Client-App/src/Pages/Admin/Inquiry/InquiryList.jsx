import React from 'react'
import Sidebar from '../../../Components/Admin-Dashboard/Sidebar/Sidebar'
import InquiryManagement from './InquiryManagement'

const InquiryList = () => {
  return (
    <div className='list'>
        <Sidebar />
        <div className="listContainer">
            <InquiryManagement/>
        </div>
      
    </div>
  )
}

export default InquiryList
