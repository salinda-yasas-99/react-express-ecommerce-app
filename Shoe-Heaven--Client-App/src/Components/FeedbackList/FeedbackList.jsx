import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import './FeedbackList.css'; 

const FeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchFeedbacks = async () => {
//       try {
//         const response = await axios.get('http://localhost:7000/api/feedbacks/get/');
//         setFeedbacks(response.data);
//         setLoading(false);
//       } catch (error) {
//         setError('Failed to load feedbacks. Please try again later.');
//         setLoading(false);
//       }
//     };

//     fetchFeedbacks();
//   }, []);

//   if (loading) {
//     return <div className="user-feedbacks">Loading feedbacks...</div>;
//   }

//   if (error) {
//     return <div className="user-feedbacks">{error}</div>;
//   }

  return (
    <div className="user-feedbacks">
      <h2>Reviews</h2>
      {feedbacks.length === 0 ? (
        <div>No feedbacks available.</div>
      ) : (
        <ul className="feedback-list">
          {feedbacks.map((feedback, index) => (
            <li key={index} className="feedback-item">
              <div className="feedback-user">
                <strong>{feedback.name}</strong>
              </div>
              <div className="feedback-rating">
                <strong>Rating:</strong> {feedback.stars} / 5
              </div>
              <div className="feedback-comment">
                <strong>Comment:</strong> {feedback.comment}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FeedbackList;
