
import './List.css'
import Sidebar from '../../../Components/Admin-Dashboard/Sidebar/Sidebar'
import Datatable from '../../../Components/Admin-Dashboard/datatable/Datatable'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const List = () => {
  // const [users, setUsers] = useState([]);

  // useEffect(async () => {
  //   // Fetch users' data from the backend when the component mounts
  //   try{
  //     axios.get('http://localhost:7000/api/users')
  //     .then(response => {
  //       setUsers(response.data);
  //       console.log(response.data);
  //     })
  //   }
  //   catch(err){
  //     console.log({ err: `${err}` });
  //   }
   
     
  // }, []);
  return (
    <div className='list'>
        <Sidebar />
        <div className="listContainer">
            <Datatable />
        </div>
      
    </div>
  )
}

export default List
