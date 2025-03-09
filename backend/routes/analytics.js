// backend/routes/analytics.js
const express = require('express');
const router = express.Router();
const db = require('../models');
const Product = db.Product;
const Order = db.Order;

// Endpoint to get inventory analytics
router.get('/inventory-stats', async (req, res) => {
  try {
    const totalProducts = await Product.count();
    const lowStockProducts = await Product.count({
      where: { 
        quantity: { [db.Sequelize.Op.lt]: db.Sequelize.col('reorderThreshold') }
      }
    });
    // Additional KPI: total orders, average order quantity, etc.
    const orders = await Order.findAll();
    const totalOrders = orders.length;
    const averageOrderQuantity = orders.reduce((acc, order) => acc + order.quantity, 0) / (totalOrders || 1);
    
    res.json({ totalProducts, lowStockProducts, totalOrders, averageOrderQuantity });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
