const express = require('express');
const router = express.Router();
const db = require('../models');
const Supplier = db.Supplier;

// Get all suppliers
router.get('/', async (req, res) => {
  try {
    const suppliers = await Supplier.findAll();
    res.json(suppliers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new supplier
router.post('/', async (req, res) => {
  try {
    const newSupplier = await Supplier.create(req.body);
    res.json(newSupplier);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a supplier
router.put('/:id', async (req, res) => {
  try {
    const supplier = await Supplier.findByPk(req.params.id);
    if (supplier) {
      await supplier.update(req.body);
      res.json(supplier);
    } else {
      res.status(404).json({ error: 'Supplier not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a supplier
router.delete('/:id', async (req, res) => {
  try {
    await Supplier.destroy({ where: { id: req.params.id } });
    res.json({ message: 'Supplier deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
