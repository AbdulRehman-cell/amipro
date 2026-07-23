const express = require('express');
const Stick = require('../models/Stick');

const router = express.Router();

// GET /api/sticks - List all sticks
router.get('/', async (req, res) => {
  try {
    const sticks = await Stick.find();
    res.json(sticks);
  } catch (error) {
    console.error('GET /api/sticks error:', error);
    res.status(500).json({ message: 'Server error fetching sticks' });
  }
});

// GET /api/sticks/:id - Get stick by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const stick = await Stick.findById(id);
    if (!stick) {
      return res.status(404).json({ message: 'Stick not found' });
    }
    res.json(stick);
  } catch (error) {
    console.error(`GET /api/sticks/${id} error:`, error);
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid stick ID' });
    }
    res.status(500).json({ message: 'Server error fetching stick' });
  }
});

// POST /api/sticks - Create a new stick
router.post('/', async (req, res) => {
  const { name, description, price, imageUrl } = req.body;

  if (typeof name !== 'string' || !name.trim()) {
    return res.status(400).json({ message: 'Name is required and must be a non-empty string' });
  }
  if (typeof description !== 'string') {
    return res.status(400).json({ message: 'Description must be a string' });
  }
  if (typeof price !== 'number' || price < 0) {
    return res.status(400).json({ message: 'Price must be a non-negative number' });
  }
  if (typeof imageUrl !== 'string' || !imageUrl.trim()) {
    return res.status(400).json({ message: 'Image URL is required and must be a non-empty string' });
  }

  try {
    const newStick = new Stick({
      name: name.trim(),
      description: description.trim(),
      price,
      imageUrl: imageUrl.trim(),
    });
    const savedStick = await newStick.save();
    res.status(201).json(savedStick);
  } catch (error) {
    console.error('POST /api/sticks error:', error);
    res.status(500).json({ message: 'Server error creating stick' });
  }
});

// PUT /api/sticks/:id - Update a stick by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, price, imageUrl } = req.body;

  // Validate input if they are provided
  if (name !== undefined && (typeof name !== 'string' || !name.trim())) {
    return res.status(400).json({ message: 'Name must be a non-empty string if provided' });
  }
  if (description !== undefined && typeof description !== 'string') {
    return res.status(400).json({ message: 'Description must be a string if provided' });
  }
  if (price !== undefined && (typeof price !== 'number' || price < 0)) {
    return res.status(400).json({ message: 'Price must be a non-negative number if provided' });
  }
  if (imageUrl !== undefined && (typeof imageUrl !== 'string' || !imageUrl.trim())) {
    return res.status(400).json({ message: 'Image URL must be a non-empty string if provided' });
  }

  try {
    const stick = await Stick.findById(id);
    if (!stick) {
      return res.status(404).json({ message: 'Stick not found' });
    }

    if (name !== undefined) stick.name = name.trim();
    if (description !== undefined) stick.description = description.trim();
    if (price !== undefined) stick.price = price;
    if (imageUrl !== undefined) stick.imageUrl = imageUrl.trim();

    const updatedStick = await stick.save();

    res.json(updatedStick);
  } catch (error) {
    console.error(`PUT /api/sticks/${id} error:`, error);
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid stick ID' });
    }
    res.status(500).json({ message: 'Server error updating stick' });
  }
});

// DELETE /api/sticks/:id - Delete a stick by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const stick = await Stick.findById(id);
    if (!stick) {
      return res.status(404).json({ message: 'Stick not found' });
    }
    await stick.deleteOne();
    res.json({ message: 'Stick deleted successfully' });
  } catch (error) {
    console.error(`DELETE /api/sticks/${id} error:`, error);
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid stick ID' });
    }
    res.status(500).json({ message: 'Server error deleting stick' });
  }
});

module.exports = router;