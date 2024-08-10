import "./Featured.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "react-circular-progressbar/dist/styles.css";

import Order_Image from '../../../assets/Orders_Image.jpg';

const Featured = ({ count }) => {
  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">This Month Order Summary</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <img src={Order_Image} alt="" />
          {/* <CircularProgressbar value={count} text={count} strokeWidth={5} /> */}
          <div className="orders-count">

         Orders recieved so far&nbsp;:
          <span style={{ color: "green",fontSize:"20px" ,marginLeft:"10px"}}>{count}</span>
          </div>
        </div>
        {/* <p className="bottomTitle">Total sales made in this month</p> */}
        {/* <p className="amount">Rs:27000</p> */}
        {/* <p className="desc">Last payments may not be included.</p> */}
      </div>
    </div>
  );
};

export default Featured;
