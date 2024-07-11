import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Shop from "./Pages/Shop";
import LoginSignup from "./Pages/LoginSignup";
import LoginSignIn from "./Pages/LoginSignIn";
import Footer from "./Components/Footer/Footer";
import Men_Banner from "../src/assets/Men_Banner.png";
import Banner_women from "../src/assets/banner_women.png";
import Banner_kid from "../src/assets/Banner_kid.png";
import ShopCategory from "./Pages/ShopCategory";
import AdminHome from "./Pages/Admin/Home/AdminHome";
import List from "./Pages/Admin/list/List";
import New from "./Pages/Admin/new/New";
import { userInputs } from "./fromSource";
import Product from "./Pages/Product";
import Cart from "./Pages/Cart";
import NewProduct from "./Pages/Admin/newproduct/NewProduct";
import ProductList from "./Pages/Admin/list/productlist/ProductList";
import AdminLogin from "./Pages/Admin/Admin-Login/AdminLogin";
import OrderSuccess from "./Components/OrderSuccess/OrderSuccess";
import Inquiry from "./Pages/Inquiry/Inquiry";

const App = () => {
  
  const isHiddenRoute  = window.location.pathname.startsWith("/dashboard")|| location.pathname === '/success' ;

  return (
    <div className="main">
      <BrowserRouter>
        {/* {window.location.pathname != "/dashboard"  &&  <Navbar />} */}
        {!isHiddenRoute  && <Navbar />}
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route
            path="/mens"
            element={<ShopCategory banner={Men_Banner} category="men" />}
          />
          <Route
            path="/womens"
            element={<ShopCategory banner={Banner_women} category="women" />}
          />
          <Route
            path="/kids"
            element={<ShopCategory banner={Banner_kid} category="kid" />}
          />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/inquiry" element={<Inquiry/>}/>
          <Route path="/success" element={<OrderSuccess />} />
          <Route path="/register" element={<LoginSignup />} />
          <Route path="/login" element={<LoginSignIn />} />
          <Route path="/dashboard/adminLogin" element={<AdminLogin />} />
          <Route path="/dashboard">
            <Route index element={<AdminHome />}></Route>
            <Route path="users">
              <Route index element={<List />} />
              <Route
                path="new"
                element={<New inputs={userInputs} title="Add New User" />}
              />
            </Route>
            <Route path="products">
              <Route index element={<ProductList />} />
              <Route
                path="new"
                element={
                  // <New inputs={productInputs} title="Add New Products" />
                  <NewProduct title="Add New Products" />
                }
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
      {/* {window.location.pathname != "/dashboard"  && <Footer />} */}
      { !isHiddenRoute  && <Footer />}
    </div>
  );
};

export default App;
