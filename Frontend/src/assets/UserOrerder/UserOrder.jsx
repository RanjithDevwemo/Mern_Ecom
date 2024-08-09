import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { ShopContext } from '../../Context/ShopContext';
// import './Orders.css'; // Add your CSS file if needed

function Orders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const {user_Id}=useContext(ShopContext)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:4001/getuserorder/${user_Id}`);
        setOrders(response.data);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Error fetching orders');
      }
    };

    if (user_Id) {
      fetchOrders();
    }
  }, [user_Id]);

  console.log(user_Id);
  console.log(orders);
  

  return (
    <div className="orders">
      <h1>User Orders</h1>
      {error && <p className="error">{error}</p>}
      {orders.length > 0 ? (
        <table border={2}>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User Name</th>
              <th>Total Products</th>
              <th>Total Amount</th>
              <th>Order Date</th>
              <th>Order Details</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.userName}</td>
                <td>{order.totalProduct}</td>
                <td>${order.total}</td>
                <td>{new Date(order.date).toLocaleDateString()}</td>
                <td>
                  <ul>
                    {Object.entries(order.orderProductName).map(([key, product]) => (
                      <li key={key}>
                        {product.name || product} {product.quantity ? `- Quantity: ${product.quantity}` : ''}
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
}

export default Orders;
