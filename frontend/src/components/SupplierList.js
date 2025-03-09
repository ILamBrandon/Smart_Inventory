// frontend/src/components/SupplierList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function SupplierList() {
  const [suppliers, setSuppliers] = useState([]);
  const [form, setForm] = useState({ name: '', contact: '', email: '' });

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/suppliers');
      setSuppliers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5001/api/suppliers', form);
      setForm({ name: '', contact: '', email: '' });
      fetchSuppliers();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Suppliers</h2>
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
          placeholder="Contact" 
          value={form.contact}
          onChange={(e) => setForm({ ...form, contact: e.target.value })}
        />
        <input 
          type="email" 
          placeholder="Email" 
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <button type="submit">Add Supplier</button>
      </form>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th><th>Contact</th><th>Email</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map(supplier => (
            <tr key={supplier.id}>
              <td>{supplier.name}</td>
              <td>{supplier.contact}</td>
              <td>{supplier.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SupplierList;
