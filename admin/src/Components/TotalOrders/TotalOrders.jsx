import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderTable = () => {
  const [orders, setOrders] = useState([]);


  // Function to fetch data from the API
  const fetchInfo = async () => {
    try {
      const response = await axios.get('http://localhost:4001/getallorders');
      if (response.status === 200) {
        setOrders(response.data); 
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchInfo();
  }, []);

  // Function to render order product names
  const renderOrderProductNames = (orderProductName) => {
    if (typeof orderProductName === 'object' && !Array.isArray(orderProductName)) {
      return Object.values(orderProductName).map((product, index) => (
        <div key={index}>
          {typeof product === 'string'
            ? product
            : `${product.name} (Quantity: ${product.quantity})`}
        </div>
      ));
    }
    return null;
  };

  // console.log(orders);
  

  return (
    <div>
      <h1>Order Table </h1>
      
      <table border={2} >
        <thead>
          <tr>
            <th>User ID</th>
            <th>User Name</th>
            <th>Total Product</th>
            <th>Order Product Name</th>
            <th>Total</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order.userId}</td>
              <td>{order.userName}</td>
              <td>{order.totalProduct}</td>
              <td>{renderOrderProductNames(order.orderProductName)}</td>
              <td>{order.total}</td>
              <td>{new Date(order.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
