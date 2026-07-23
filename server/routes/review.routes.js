const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

// GET /api/reviews - list all reviews
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (err) {
    console.error('Failed to get reviews:', err);
    res.status(500).json({ error: 'Server error fetching reviews' });
  }
});

// GET /api/reviews/:id - get a single review by id
router.get('/:id', async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }
    res.json(review);
  } catch (err) {
    console.error('Failed to get review:', err);
    if (err.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid review ID' });
    }
    res.status(500).json({ error: 'Server error fetching review' });
  }
});

// POST /api/reviews - create a new review
router.post('/', async (req, res) => {
  try {
    const { stickId, userName, rating, comment, date } = req.body;

    if (
      typeof stickId !== 'string' ||
      typeof userName !== 'string' ||
      typeof rating !== 'number' ||
      rating < 0 || rating > 5 ||
      typeof comment !== 'string' ||
      (date && isNaN(Date.parse(date)))
    ) {
      return res.status(400).json({ error: 'Invalid review data' });
    }

    const newReview = new Review({
      stickId,
      userName,
      rating,
      comment,
      date: date ? new Date(date) : new Date()
    });

    const savedReview = await newReview.save();
    res.status(201).json(savedReview);
  } catch (err) {
    console.error('Failed to create review:', err);
    res.status(500).json({ error: 'Server error creating review' });
  }
});

// PUT /api/reviews/:id - update an existing review
router.put('/:id', async (req, res) => {
  try {
    const { stickId, userName, rating, comment, date } = req.body;

    if (
      (stickId && typeof stickId !== 'string') ||
      (userName && typeof userName !== 'string') ||
      (rating !== undefined && (typeof rating !== 'number' || rating < 0 || rating > 5)) ||
      (comment && typeof comment !== 'string') ||
      (date && isNaN(Date.parse(date)))
    ) {
      return res.status(400).json({ error: 'Invalid review data' });
    }

    const updatedData = {};
    if (stickId !== undefined) updatedData.stickId = stickId;
    if (userName !== undefined) updatedData.userName = userName;
    if (rating !== undefined) updatedData.rating = rating;
    if (comment !== undefined) updatedData.comment = comment;
    if (date !== undefined) updatedData.date = new Date(date);

    const updatedReview = await Review.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true, runValidators: true }
    );

    if (!updatedReview) {
      return res.status(404).json({ error: 'Review not found' });
    }

    res.json(updatedReview);
  } catch (err) {
    console.error('Failed to update review:', err);
    if (err.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid review ID' });
    }
    res.status(500).json({ error: 'Server error updating review' });
  }
});

// DELETE /api/reviews/:id - delete a review
router.delete('/:id', async (req, res) => {
  try {
    const deletedReview = await Review.findByIdAndDelete(req.params.id);
    if (!deletedReview) {
      return res.status(404).json({ error: 'Review not found' });
    }
    res.json({ message: 'Review deleted' });
  } catch (err) {
    console.error('Failed to delete review:', err);
    if (err.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid review ID' });
    }
    res.status(500).json({ error: 'Server error deleting review' });
  }
});

module.exports = router;