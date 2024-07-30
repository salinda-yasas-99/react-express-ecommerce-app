import React, { useState, useEffect } from "react";
import Sidebar from "../../../Components/Admin-Dashboard/Sidebar/Sidebar";
import "./AdminHome.css";
import Widget from "../../../Components/Admin-Dashboard/widget/Widget";
import Featured from "../../../Components/Admin-Dashboard/featured/Featured";
import Chart from "../../../Components/Admin-Dashboard/chart/Chart";
import Table from "../../../Components/Admin-Dashboard/table/Table";
import axios from "axios";

const AdminHome = () => {
  const [users, setUsers] = useState(0);
  const [orders, setOrders] = useState(0);
  const [products, setProducts] = useState(0);
  const [inquiry, setInquiry] = useState(0);
  const [data, setData] = useState([]);
  const [currentOrders, setCurrentOrders] = useState([]);

  const fetchChartData = async () => {
    const authToken = localStorage.getItem("access_token");

    try {
      const authAxios = axios.create({
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        withCredentials: true,
      });

      const response = await authAxios.get(
        `http://localhost:7000/api/orders/monthlyOrders`
      );
      console.log("fetch feedbacks", response.data);

      setData(response.data);
      //return response.data;
    } catch (err) {
      console.log("This is error", err);
    }
  };

  const fetchCurrentMonthOrders = async () => {
    const authToken = localStorage.getItem("access_token");

    try {
      const authAxios = axios.create({
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        withCredentials: true,
      });

      const response = await authAxios.get(
        `http://localhost:7000/api/orders/currentOrders`
      );
      console.log("fetch orders", response.data);

      setCurrentOrders(response.data);
      //return response.data;
    } catch (err) {
      console.log("This is error", err);
    }
  };

  const fetchUsers = async () => {
    const authToken = localStorage.getItem("access_token");
    try {
      const authAxios = axios.create({
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        withCredentials: true,
      });

      const response = await authAxios.get(
        `http://localhost:7000/api/users/getAllUsers/user`
      );
      console.log("fetch feedbacks", response.data);
      const userArr = response.data;
      setUsers(userArr.length);
      //return response.data;
    } catch (err) {
      console.log("This is error", err);
    }
  };

  const fetchOrder = async () => {
    const authToken = localStorage.getItem("access_token");

    try {
      const authAxios = axios.create({
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        withCredentials: true,
      });

      const response = await authAxios.get(
        `http://localhost:7000/api/orders/getAllOrders`
      );
      console.log("fetch feedbacks", response.data);
      const ordArr = response.data;
      setOrders(ordArr.length);
      //return response.data;
    } catch (err) {
      console.log("This is error", err);
    }
  };

  const fetchProducts = async () => {
    const authToken = localStorage.getItem("access_token");

    try {
      const authAxios = axios.create({
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        withCredentials: true,
      });

      const response = await authAxios.get(
        `http://localhost:7000/api/products/getAllProducts`
      );
      console.log("fetch feedbacks", response.data);
      const prod = response.data;
      setProducts(prod.length);
      //return response.data;
    } catch (err) {
      console.log("This is error", err);
    }
  };

  const fetchInquiry = async () => {
    const authToken = localStorage.getItem("access_token");

    try {
      const authAxios = axios.create({
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        withCredentials: true,
      });

      const response = await authAxios.get(
        `http://localhost:7000/api/inqueries/get`
      );
      console.log("fetch feedbacks", response.data);
      const inqArr = response.data;
      setInquiry(inqArr.length);
      //return response.data;
    } catch (err) {
      console.log("This is error", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    fetchOrder();
    fetchChartData();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    fetchInquiry();
  }, []);

  useEffect(() => {
    fetchCurrentMonthOrders();
  }, []);

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <h1>Welcome {localStorage.getItem("username")} {localStorage.getItem("role")}</h1>
        <div className="widgets">
          <Widget type="user" count={users} />
          <Widget type="order" count={orders} />
          <Widget type="products" count={products} />
          <Widget type="inquiry" count={inquiry} />
        </div>
        <div className="charts">
          <Featured />
          <Chart data={data} />
        </div>
        <div className="listContainer">
          <div className="listTitle">Recent Orders</div>
          <Table orders={currentOrders} />
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
