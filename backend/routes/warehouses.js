// backend/routes/warehouses.js
const express = require('express');
const router = express.Router();
const db = require('../models');
const Warehouse = db.Warehouse;

// Get all warehouses
router.get('/', async (req, res) => {
  try {
    const warehouses = await Warehouse.findAll();
    res.json(warehouses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new warehouse
router.post('/', async (req, res) => {
  try {
    const newWarehouse = await Warehouse.create(req.body);
    res.json(newWarehouse);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
