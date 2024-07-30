import "./Featured.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";

const Featured = ({ count }) => {
  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Total This Month Orders</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          {/* <CircularProgressbar value={count} text={count} strokeWidth={5} /> */}
          {"This is total this month orders"}
          <span style={{ color: "red" }}>{count}</span>
        </div>
        {/* <p className="bottomTitle">Total sales made in this month</p> */}
        {/* <p className="amount">Rs:27000</p> */}
        {/* <p className="desc">Last payments may not be included.</p> */}
      </div>
    </div>
  );
};

export default Featured;
