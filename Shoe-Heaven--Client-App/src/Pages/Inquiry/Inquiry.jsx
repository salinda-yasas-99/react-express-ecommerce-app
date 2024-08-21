import React, { useState } from "react";
import "./Inquiry.css";
import axios from "axios";
import { FiPhoneIncoming, FiMail } from "react-icons/fi";

const Inquiry = () => {
  const initialInquirydata = {
    name: "",
    subject: "",
    message: "",
  };
  const [inputs, setInputs] = useState(initialInquirydata);
  const [formError, setFormError] = useState(null);
  const [error, setError] = useState(null);

  // const handleChange = (e) => {
  //   setInputs((prev) => ({ ...prev, [e.target.name]: [e.target.value] }));
  // };

  // const allFieldsFilled = () => {
  //   return inputs.name && inputs.subject && inputs.message;
  // };

  const [inquiry, setInquiry] = useState({
    name: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setInquiry({
      ...inquiry,
      [id]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (!allFieldsFilled()) {
    //   setFormError(
    //     "Please fill out all fields before submitting your inquiry."
    //   );

    //   setTimeout(() => setFormError(""), 5000);
    //   return;
    // }
    try {
      console.log("this is inq", inquiry);

      const response = await axios.post(
        "http://localhost:7000/api/inqueries/add",
        inquiry
      );
      console.log(response);
      console.log(response.data);
      alert("Inquiry added sucessfully");
      setInquiry({ name: "", subject: "", message: "" });
      //setInputs(initialInquirydata);
      //setFormError(null);
    } catch (error) {
      console.log(error);
      // setError("Failed to submit inquiry. Please try again later.");
    }
  };
  return (
    <div className="inquiry">
      <div className="inquiry-container">
        <h3>HOW CAN WE HELP YOU?</h3>
        <form className="inquiry-fields">
          <input
            id="name"
            type="text"
            placeholder="Name"
            name="username"
            value={inquiry.name}
            required
            onChange={handleChange}
          />
          <input
            id="subject"
            type="text"
            placeholder="Subject"
            name="subject"
            value={inquiry.subject}
            required
            onChange={handleChange}
          />
          <textarea
            id="message"
            className="inquiry-content"
            placeholder="Message..."
            name="message"
            value={inquiry.message}
            onChange={handleChange}
          />
          <p className="error-msg">{formError}</p>
        </form>

        <div>
          <button onClick={handleSubmit} className="inquiry-btn">
            Submit{" "}
          </button>
        </div>
      </div>
      <div className="contactus">
        <h3>Get in touch with us </h3>
        <div className="contactus-card">
          <div>
            <FiPhoneIncoming className="contact-icon" />
            <a href="tel:+94 77 440 9158" style={{color:"#000"}}>O77 440 9158</a>
            
          </div>
          <div>
          <FiMail className="contact-icon" /> shoeHeaven@gmail.com
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inquiry;
