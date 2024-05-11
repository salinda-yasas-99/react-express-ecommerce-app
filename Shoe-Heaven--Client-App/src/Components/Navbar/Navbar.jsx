import React, { useContext, useState } from "react";
import "./Navbar.css";

import logo from "../../assets/logo.png";
import cart_icon from "../../assets/cart_icon.png";
import { Link ,useNavigate } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";

const Navbar = () => {
  const [menu, setMenu] = useState("/");
  const {getTotalCartItems} = useContext(ShopContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('access_token'); 
    setTimeout(() => {
      navigate('/'); 
  }, 100);
  }

  return (
    <div className="navbar">
      <Link to={"/"}>
        <button
          onClick={() => {
            setMenu("/");
          }}
          className="nav-logo"
        >
          <img src={logo} alt="" />
          <p>SHOE HEAVEN</p>
        </button>
      </Link>
      <ul className="nav-menu">
        <Link style={{ textDecoration: "none", color: "black" }} to="/">
          <li
            onClick={() => {
              setMenu("/");
            }}
            className={`${menu === "/" ? "navActive" : ""}`}
          >
            Shop
          </li>
        </Link>
        <li
          onClick={() => {
            setMenu("mens");
          }}
          className={`${menu === "mens" ? "navActive" : ""}`}
        >
          <Link style={{ textDecoration: "none", color: "black" }} to="/mens">
            Men
          </Link>
        </li>
        <li
          onClick={() => {
            setMenu("womens");
          }}
          className={`${menu === "womens" ? "navActive" : ""}`}
        >
          <Link style={{ textDecoration: "none", color: "black" }} to="/womens">
            Women
          </Link>
        </li>
        <li
          onClick={() => {
            setMenu("kids");
          }}
          className={`${menu === "kids" ? "navActive" : ""}`}
        >
          <Link style={{ textDecoration: "none", color: "black" }} to="/kids">
            Kids
          </Link>
        </li>
      </ul>
      <nav className="nav-login-cart">
      {localStorage.getItem('access_token') ? 
          <button onClick={handleLogout}>Logout</button> :
          <Link to="/login">
            <button>Login</button>
          </Link>
        }
        <Link to="/cart">
          <img src={cart_icon} alt="" />
        </Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </nav>
    </div>
  );
};

export default Navbar;
