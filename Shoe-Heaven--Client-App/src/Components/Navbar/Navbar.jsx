// import React, { useContext, useState } from "react";
// import "./Navbar.css";

// import logo from "../../assets/logo.png";
// import cart_icon from "../../assets/cart_icon.png";
// import { Link ,useNavigate } from "react-router-dom";
// import { ShopContext } from "../../Context/ShopContext";

// const Navbar = () => {
//   const [menu, setMenu] = useState("/");
//   const {getTotalCartItems} = useContext(ShopContext);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem('access_token');
//     localStorage.removeItem('uid');
//     localStorage.removeItem('username');
//     setTimeout(() => {
//       navigate('/');
//   }, 100);
//   }

//   return (
//     <div className="navbar">
//       <Link to={"/"}>
//         <button
//           onClick={() => {
//             setMenu("/");
//           }}
//           className="nav-logo"
//         >
//           <img src={logo} alt="" />
//           <p>SHOE HEAVEN</p>
//         </button>
//       </Link>
//       <ul className="nav-menu">
//         <Link style={{ textDecoration: "none", color: "black" }} to="/">
//           <li
//             onClick={() => {
//               setMenu("/");
//             }}
//             className={`${menu === "/" ? "navActive" : ""}`}
//           >
//             Shop
//           </li>
//         </Link>
//         <li
//           onClick={() => {
//             setMenu("mens");
//           }}
//           className={`${menu === "mens" ? "navActive" : ""}`}
//         >
//           <Link style={{ textDecoration: "none", color: "black" }} to="/mens">
//             Men
//           </Link>
//         </li>
//         <li
//           onClick={() => {
//             setMenu("womens");
//           }}
//           className={`${menu === "womens" ? "navActive" : ""}`}
//         >
//           <Link style={{ textDecoration: "none", color: "black" }} to="/womens">
//             Women
//           </Link>
//         </li>
//         <li
//           onClick={() => {
//             setMenu("kids");
//           }}
//           className={`${menu === "kids" ? "navActive" : ""}`}
//         >
//           <Link style={{ textDecoration: "none", color: "black" }} to="/kids">
//             Kids
//           </Link>
//         </li>
//       </ul>
//       <nav className="nav-login-cart">
//       {localStorage.getItem('access_token') ?
//           <button onClick={handleLogout}>Logout</button> :
//           <Link to="/login">
//             <button>Login</button>
//           </Link>
//         }
//         <Link to="/cart">
//           <img src={cart_icon} alt="" />
//         </Link>
//         <div className="nav-cart-count">{getTotalCartItems()}</div>
//       </nav>
//     </div>
//   );
// };

// export default Navbar;

import React, { useContext, useState, useEffect } from "react";
import "./Navbar.css";

import logo from "../../assets/logo.png";
import cart_icon from "../../assets/cart_icon.png";
import User_Icon from "../../assets/user-icon.png";
import { Link, useNavigate } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
  const [menu, setMenu] = useState("/");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const { getTotalCartItems } = useContext(ShopContext);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    if (isLoggedIn) {
      setIsDropdownVisible(!isDropdownVisible);
    }
  };

  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      const decodedToken = jwtDecode(token);

      setUsername(decodedToken.username);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("uid");
    localStorage.removeItem("username");
    setUsername("");
    setIsLoggedIn(false);
    setIsDropdownVisible(false);
    setTimeout(() => {
      navigate("/");
      window.location.reload();
    }, 100);
  };

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
        {localStorage.getItem("access_token") ? (
          <button className="login-logout-btn" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <Link to="/login">
            <button className="login-logout-btn">Login</button>
          </Link>
        )}
        <Link to="/cart" style={{ display: "flex", width: "30px" }}>
          <img src={cart_icon} alt="" />
        </Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>

        <div className="edit-profile">
          <button className="profile-image" onClick={toggleDropdown}>
            <img src={User_Icon} alt="" />
          </button>
          {isLoggedIn && isDropdownVisible && (
            <>
              <div className="btn-dropdown">
                <span>{username}</span>
                <hr />
                <Link to="/editprofile">
                  <button className="dropdown-options">Edit Profile</button>
                </Link>
                <Link to={"/my-orders"}>
                  <button className="dropdown-options">My Orders</button>
                </Link>
              </div>
              <div className="overlay" onClick={toggleDropdown}></div>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
