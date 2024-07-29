import React from 'react';
import Sidebar from '../../../Components/Admin-Dashboard/Sidebar/Sidebar';
import StafDataTable from './StafDataTable';


const StaffList = () => {
  
  return (
    <div className='staff-list'>
        <Sidebar />
        <div className="listContainer">
           <StafDataTable/>
        </div>
      
    </div>
  )
}

export default StaffList;
