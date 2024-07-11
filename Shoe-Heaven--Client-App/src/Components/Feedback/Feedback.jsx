
import React, { useState } from 'react';
import './Feedback.css'; 
import axios from 'axios';
const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');

  const handleRatingClick = (rate) => {
    setRating(rate);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit =  async() => {
    if (rating === 0 || comment.trim() === '') {
      alert('Please provide both a rating and a comment.');
      return;
    }
    
    try{
        const response = await axios.post('http://localhost:7000/api/feedbacks/add', {
            rating,
            comment,
          });

          console.log(response.data); 
      alert('Feedback submitted successfully!');
      setRating(0);
      setComment('');
    }catch(error){
        console.error('Error submitting feedback:', error);
      alert('Failed to submit feedback. Please try again later.');
    }
    console.log({ rating, comment });
    alert('Feedback submitted successfully!');
    setRating(0);
    setComment('');
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
