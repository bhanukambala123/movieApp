const express = require('express');
const router = express.Router();
const Movie = require('../models/movie');

// ✅ GET all movies
router.get('/', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: 'Failed to load movies' });
  }
});

// ✅ POST a new movie (for Postman)
router.post('/', async (req, res) => {
  const { title, description, posterUrl } = req.body;

  if (!title || !description || !posterUrl) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const movie = new Movie({ title, description, posterUrl });
    await movie.save();
    res.status(201).json({ message: 'Movie added successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to add movie' });
  }
});

module.exports = router;