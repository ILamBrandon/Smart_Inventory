// frontend/src/components/OrderList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function OrderList() {
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState({ productId: '', supplierId: '', quantity: 1 });

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/orders');
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5001/api/orders', form);
      setForm({ productId: '', supplierId: '', quantity: 1 });
      fetchOrders();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Orders</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <input 
          type="text" 
          placeholder="Product ID" 
          value={form.productId}
          onChange={(e) => setForm({ ...form, productId: e.target.value })}
          required
        />
        <input 
          type="text" 
          placeholder="Supplier ID" 
          value={form.supplierId}
          onChange={(e) => setForm({ ...form, supplierId: e.target.value })}
          required
        />
        <input 
          type="number" 
          placeholder="Quantity" 
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: parseInt(e.target.value) })}
          required
        />
        <button type="submit">Create Order</button>
      </form>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th><th>Product</th><th>Supplier</th><th>Quantity</th><th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.Product ? order.Product.name : order.productId}</td>
              <td>{order.supplierId}</td>
              <td>{order.quantity}</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrderList;
