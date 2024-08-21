import React, { useState } from "react";
import "./Feedback.css";
import axios from "axios";
const Feedback = ({ productId }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");

  const handleRatingClick = (rate) => {
    setRating(rate);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = async () => {
    const uid = localStorage.getItem("uid");
    const authToken = localStorage.getItem("access_token");
    if (!authToken) {
      alert("Please log in");
      setRating(0);
      setHover(0);
      setComment("");
      return;
    }

    if (rating === 0 || comment.trim() === "") {
      alert("Please provide both a rating and a comment.");
      return;
    }

    try {
      const feedbackObj = {
        stars: parseInt(rating),
        comment: comment,
        prodID: productId,
        userID: parseInt(uid),
      };
      console.log("this is feed", feedbackObj);
      const authAxios = axios.create({
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        withCredentials: true,
      });

      const response = await authAxios.post(
        "http://localhost:7000/api/feedbacks/add",
        feedbackObj
      );

      console.log(response.data);
      alert("Feedback submitted successfully!");
      setRating(0);
      setComment("");
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Failed to submit feedback. Please try again later.");
    }
  };

  return (
    <div className="feedback-container">
      <h2>Leave your feedback</h2>
      <div className="star-rating">
        {[...Array(5)].map((star, index) => {
          index += 1;
          return (
            <button
              type="button"
              key={index}
              className={index <= (hover || rating) ? "on" : "off"}
              onClick={() => handleRatingClick(index)}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(rating)}
            >
              <span className="star">&#9733;</span>
            </button>
          );
        })}
      </div>
      <textarea
        className="comment-box"
        placeholder="Leave a comment..."
        value={comment}
        onChange={handleCommentChange}
      />
      <button className="submit-button" onClick={handleSubmit}>
        Submit Feedback
      </button>
    </div>
  );
};

export default Feedback;
