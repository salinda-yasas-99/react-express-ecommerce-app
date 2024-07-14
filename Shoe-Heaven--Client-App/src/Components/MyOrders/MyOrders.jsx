import React, { useState, useEffect } from 'react';
import './MyOrders.css';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
   
    const fetchOrders = async () => {
      const mockOrders = [
        {
          id: 'RO374915036',
          date: 'Thu, 17th Feb 2024',
          status: 'Pending',
          deliveryDate: '24 December 2024',
          total: 30100,
          items: [
            {
              name: 'AVI men Hiking Shoes',
              image: '/images/shoe1.jpg',
              price: 12500,
              size: '5',
              qty: 1,
              author: 'Milly Thomas'
            },
            {
              name: 'winner Ladies',
              image: '/images/shoe2.jpg',
              price: 17600,
              size: '9',
              qty: 1,
              
            },
          ],
        },
      ];
      setOrders(mockOrders);
    };

    fetchOrders();
  }, []);

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <p>View  your pending, delivered orders here.</p>
      <div className="orders-list">
        {orders.map((order) => (
          <div key={order.id} className="order-item">
            <div className="order-header">
              <div className="order-id">
                <span>Order</span> <a href="#">{order.id}</a>
              </div>
              <div className="order-date">
                Order Placed: {order.date}
              </div>
              
            </div>
            <div className="order-items">
              {order.items.map((item, index) => (
                <div key={index} className="order-item-details">
                  <img src={item.image} alt={item.name} className="item-image" />
                  <div className="item-info">
                    <p className="item-name">{item.name}</p>
                    <p className="item-author">By: {item.author}</p>
                    <p className="item-size">Size: {item.size}</p>
                    <p className="item-qty">Qty: {item.qty}</p>
                    <p className="item-price">Rs. {item.price}</p>
                  </div>
                  <div className="item-status">
                    <p className="status-label">Status</p>
                    <p className="status">{order.status}</p>
                    <p className="delivery-date">Placed Date: {order.deliveryDate}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="order-footer">
               <p>Total Amount</p>
              <p className="order-total">Rs. {order.total}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
