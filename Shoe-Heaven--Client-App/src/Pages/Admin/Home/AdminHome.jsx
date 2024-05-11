import React from 'react'
import Sidebar from '../../../Components/Admin-Dashboard/Sidebar/Sidebar'
import './AdminHome.css'
import Widget from '../../../Components/Admin-Dashboard/widget/Widget'
import Featured from '../../../Components/Admin-Dashboard/featured/Featured'
import Chart from '../../../Components/Admin-Dashboard/chart/Chart'
import Table from '../../../Components/Admin-Dashboard/table/Table'


const AdminHome = () => {
  return (
    <div className='home'>
       <Sidebar/>
       <div className="homeContainer">
        container

        <div className="widgets">
          <Widget type="user"/>
          <Widget type="order"/>
          <Widget type="products"/>
          <Widget type="inquiry"/>
        </div>
        <div className="charts">
          <Featured/>
          <Chart/>
        </div>
        <div className="listContainer">
          <div className="listTitle">Recent Orders</div>
          <Table/>
        </div>
       </div>
    </div>
  )
}

export default AdminHome
