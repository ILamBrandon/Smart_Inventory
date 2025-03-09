import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Card, Row, Col, ListGroup } from 'react-bootstrap';
import 'chart.js/auto';

function InventoryDashboard() {
  // Initialize with proper default structure
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [lowStockProducts, setLowStockProducts] = useState([]);

  useEffect(() => {
    fetchLowStock();
    fetchChartData();
  }, []);

  const fetchLowStock = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/products/low-stock');
      setLowStockProducts(res.data);
    } catch (err) {
      console.error('Error fetching low stock products:', err);
    }
  };

  const fetchChartData = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/products');
      const products = res.data;
      const labels = products.map(p => p.name);
      const quantities = products.map(p => p.quantity);

      setChartData({
        labels,
        datasets: [
          {
            label: 'Stock Level',
            data: quantities,
            backgroundColor: 'rgba(75,192,192,0.6)',
          }
        ]
      });
    } catch (err) {
      console.error('Error fetching chart data:', err);
    }
  };

  return (
    <div>
      <h2>Inventory Dashboard</h2>
      <Row className="mb-4">
        <Col md={6}>
          <Card>
            <Card.Header>Low Stock Alerts</Card.Header>
            <ListGroup variant="flush">
              {lowStockProducts.length > 0 ? (
                lowStockProducts.map(product => (
                  <ListGroup.Item key={product.id}>
                    {product.name} - {product.quantity} in stock
                  </ListGroup.Item>
                ))
              ) : (
                <ListGroup.Item>No low stock products.</ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Header>Stock Levels</Card.Header>
            <Card.Body>
              <Bar data={chartData} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default InventoryDashboard;
