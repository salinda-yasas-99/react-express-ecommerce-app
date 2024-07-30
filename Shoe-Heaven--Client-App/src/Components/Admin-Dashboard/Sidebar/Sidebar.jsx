import "./Sidebar.css";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import FeedbackIcon from "@mui/icons-material/Feedback";
import ReviewsIcon from "@mui/icons-material/Reviews";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import ShoppingCartCheckoutRoundedIcon from "@mui/icons-material/ShoppingCartCheckoutRounded";
import HelpCenterRoundedIcon from "@mui/icons-material/HelpCenterRounded";
import { Link,useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const logout = () =>{
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    
    if (confirmLogout) {
      
      localStorage.removeItem("access_token");
      localStorage.removeItem("uid");
      localStorage.removeItem("username");
      navigate("/dashboard/adminLogin");
    }
  }
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/dashboard" style={{ textDecoration: "none" }}>
          <span className="logo">Admin Dashboard</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/dashboard" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          {/* <p className="title">MANAGE</p> */}
          <Link to="/dashboard/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Customers</span>
            </li>
          </Link>
          <Link to="/dashboard/products" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Products</span>
            </li>
          </Link>
          <Link to="/dashboard/orders" style={{ textDecoration: "none" }}>
            <li>
              <ShoppingCartCheckoutRoundedIcon className="icon" />
              <span>Orders</span>
            </li>
          </Link>
          <Link to="/dashboard/staff" style={{ textDecoration: "none" }}>
            <li>
              <ManageAccountsIcon className="icon" />
              <span>Staff Management</span>
            </li>
          </Link>
          <p className="title">Services</p>
          <Link to="/dashboard/stock-prediction" style={{ textDecoration: "none" }}>
          <li>
            <InsertChartIcon className="icon" />
            <span>Stock Prediction</span>
          </li>
          </Link>
          <li>
            <CreditCardIcon className="icon" />
            <span>Payments</span>
          </li>

          <Link
            to="/dashboard/manage/inquiry"
            style={{ textDecoration: "none" }}
          >
            <li>
              <HelpCenterRoundedIcon className="icon" />
              <span>Inquiry</span>
            </li>
          </Link>

          <p className="title">USER</p>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Profile</span>
          </li>
          <li onClick={logout}>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
