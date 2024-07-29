// import React, { useEffect, useState } from "react";
// // import axios from 'axios';
// import "./FeedbackList.css";
// import axios from "axios";

// const FeedbackList = ({ productId }) => {
//   const [feedbacks, setFeedbacks] = useState([]);
//   //const [loading, setLoading] = useState(true);
//   //const [error, setError] = useState(null);

//   const fetchFeedbacks = async () => {
//     const prodId = productId;
//     try {
//       const response = await axios.get(
//         `http://localhost:7000/api/feedbacks/get/${prodId}`
//       );
//       console.log("fetch feedbacks", response.data);
//       setFeedbacks(response.data);
//       //return response.data;
//     } catch (err) {
//       console.log("This is error", err);
//     }
//   };

//   useEffect(() => {
//     fetchFeedbacks();
//   }, []);

//   //   useEffect(() => {
//   //     const fetchFeedbacks = async () => {
//   //       try {
//   //         const response = await axios.get('http://localhost:7000/api/feedbacks/get/');
//   //         setFeedbacks(response.data);
//   //         setLoading(false);
//   //       } catch (error) {
//   //         setError('Failed to load feedbacks. Please try again later.');
//   //         setLoading(false);
//   //       }
//   //     };

//   //     fetchFeedbacks();
//   //   }, []);

//   //   if (loading) {
//   //     return <div className="user-feedbacks">Loading feedbacks...</div>;
//   //   }

//   //   if (error) {
//   //     return <div className="user-feedbacks">{error}</div>;
//   //   }

//   const renderStars = (rating) => {
//     return [...Array(5)].map((star, index) => {
//       index += 1;
//       return (
//         <span key={index} className={index <= rating ? "star on" : "star off"}>
//           &#9733;
//         </span>
//       );
//     });
//   };

//   return (
//     <div className="user-feedbacks">
//       <h2>Reviews</h2>
//       {feedbacks.length === 0 ? (
//         <div>No feedbacks available.</div>
//       ) : (
//         <ul className="feedback-list">
//           {feedbacks.map((feedback, index) => (
//             <li key={index} className="feedback-item">
//               <div className="feedback-user">
//                 <strong>{feedback.username}</strong>
//               </div>
//               <div className="feedback-rating">
//                 {/* <strong>Rating:</strong> {feedback.stars} / 5 */}
//                 {renderStars(feedback.stars)}
//               </div>
//               <div className="feedback-comment">
//                 <strong>Comment:</strong> {feedback.comment}
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default FeedbackList;
