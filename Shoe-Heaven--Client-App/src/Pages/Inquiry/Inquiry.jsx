import React, { useState } from "react";
import "./Inquiry.css";
import axios from "axios";

const Inquiry = () => {
  const initialInquirydata ={
    name:"",
    subject:"",
    message:""
  };
  const [inputs,setInputs] = useState(initialInquirydata);
  const [formError, setFormError] = useState(null);
  const [error,setError] = useState(null);

  const handleChange =e=>{
    setInputs(prev =>({...prev,[e.target.name]:[e.target.value]}))
  }

  const allFieldsFilled = () => {
    
    return (
      inputs.name &&
     inputs.subject &&
      inputs.message
    )
  };

  const handleSubmit = async e=>{
     e.preventDefault();

     if (!allFieldsFilled()) {
      setFormError("Please fill out all fields before submitting your inquiry.");
 
      setTimeout(() => setFormError(""), 5000);
      return;
    }
     try{
        const response = await axios.post('http://localhost:7000/api/inquiries/add', inputs);
        console.log(response.data);
        alert("Inquiry added sucessfully");
        setInputs(initialInquirydata);
        setFormError(null);
     }catch(error){
      console.log(error);
      setError('Failed to submit inquiry. Please try again later.');
     }
  }
  return (
    <div className="inquiry">
      <div className="inquiry-container">
        <h3>HOW CAN WE HELP YOU?</h3>
        <form className="inquiry-fields">
        <input type="text" placeholder="Name" name="username" value={inputs.name} required onChange={handleChange} />
          <input type="text" placeholder="Subject" name="subject" value={inputs.subject} required onChange={handleChange} />
          <textarea className="inquiry-content" placeholder="Message..." name="message"  value={inputs.message}onChange={handleChange}/>
          <p className="error-msg">{formError}</p>
        </form>

        <div>
        <button  onClick={handleSubmit} className="inquiry-btn">Submit </button>
      </div>
      </div>
      
    </div>
  );
};

export default Inquiry;
