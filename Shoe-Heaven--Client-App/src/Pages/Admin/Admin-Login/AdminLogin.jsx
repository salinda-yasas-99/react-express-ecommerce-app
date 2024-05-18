
import React, { useState } from 'react'
import './AdminLogin.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const AdminLogin = () => {
  const  [inputs,setInputs] = useState({
    username:"",
    password:"",
  })

  const [err,setError] = useState(null)

//   const navigate =  useNavigate()

//   const handleChange = e =>{
//     setInputs(prev=>({...prev,[e.target.name]:e.target.value}))
//   }

  // console.log(inputs);
//   const handleSubmit = async e =>{
//     e.preventDefault()
//     try{
//       console.log("work");
//       const res = await axios.post("http://localhost:4000/api/auth/login",inputs)
//       console.log(res);
//       navigate("/");

//     }catch(err){
//         // console.log(err);
//         setError(err.response.data)
//     }
//       }
  return (
    <div className='admin-login'> 
      <h1> Admin Panal Login</h1>
      <form action="" className='admin-form'>
        <input type="text" placeholder='username' name='username'  required />
        <input type="password" placeholder='Password' name='password'  required />
        <button >Login</button>
        
        <span>Don't you have an Account? <Link to ='#'>Register</Link></span>
      </form>
    </div>
  )
}

export default AdminLogin

