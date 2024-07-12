import React from 'react';
import Sidebar from '../../../Components/Admin-Dashboard/Sidebar/Sidebar';
import OrdersDataTable from './OrdersDataTable';



const OrdersList = () => {
  
  return (
    <div className='list'>
        <Sidebar />
        <div className="listContainer">
            <OrdersDataTable/>
        </div>
      
    </div>
  )
}

export default OrdersList;
