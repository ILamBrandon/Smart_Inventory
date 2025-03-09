const express = require('express');
const router = express.Router();
const db = require('../models');
const Order = db.Order;
const Product = db.Product;

// Get all orders (with associated product info)
router.get('/', async (req, res) => {
  try {
    const orders = await Order.findAll({ include: [Product] });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new order and update product inventory
router.post('/', async (req, res) => {
  try {
    const { productId, supplierId, quantity } = req.body;
    // Find product and update its stock
    const product = await Product.findByPk(productId);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    product.quantity = product.quantity - quantity;
    await product.save();

    const newOrder = await Order.create(req.body);
    res.json(newOrder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
