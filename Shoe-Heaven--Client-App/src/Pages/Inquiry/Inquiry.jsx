import React from "react";
import "./Inquiry.css";

const Inquiry = () => {
  return (
    <div className="inquiry">
      <div className="inquiry-container">
        <h3>HOW CAN WE HELP YOU?</h3>
        <form className="inquiry-fields">
        <input type="text" placeholder="Name" name="subject" required />
          <input type="text" placeholder="Subject" name="subject" required />
          <textarea className="inquiry-content" placeholder="Message..." />
        </form>

        <div>
        <button className="inquiry-btn">Submit </button>
      </div>
      </div>
      
    </div>
  );
};

export default Inquiry;
