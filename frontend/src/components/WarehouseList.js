import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Form } from 'react-bootstrap';

function WarehouseList() {
  const [warehouses, setWarehouses] = useState([]);
  const [form, setForm] = useState({ name: '', location: '' });

  useEffect(() => {
    fetchWarehouses();
  }, []);

  const fetchWarehouses = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/warehouses');
      setWarehouses(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5001/api/warehouses', form);
      setForm({ name: '', location: '' });
      fetchWarehouses();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Warehouses</h2>
      <Form onSubmit={handleSubmit} className="mb-4">
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Warehouse Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            placeholder="Location"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add Warehouse
        </Button>
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {warehouses.map((warehouse) => (
            <tr key={warehouse.id}>
              <td>{warehouse.name}</td>
              <td>{warehouse.location}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default WarehouseList;
