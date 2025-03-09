// frontend/src/components/ProductList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', description: '', quantity: 0, price: 0, reorderThreshold: 10 });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/products');
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5001/api/products', form);
      setForm({ name: '', description: '', quantity: 0, price: 0, reorderThreshold: 10 });
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Products</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <input 
          type="text" 
          placeholder="Name" 
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input 
          type="text" 
          placeholder="Description" 
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <input 
          type="number" 
          placeholder="Quantity" 
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: parseInt(e.target.value) })}
          required
        />
        <input 
          type="number" 
          placeholder="Price" 
          value={form.price}
          onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) })}
          required
        />
        <input 
          type="number" 
          placeholder="Reorder Threshold" 
          value={form.reorderThreshold}
          onChange={(e) => setForm({ ...form, reorderThreshold: parseInt(e.target.value) })}
          required
        />
        <button type="submit">Add Product</button>
      </form>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th><th>Description</th><th>Quantity</th><th>Price</th><th>Reorder Threshold</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.quantity}</td>
              <td>{product.price}</td>
              <td>{product.reorderThreshold}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;
