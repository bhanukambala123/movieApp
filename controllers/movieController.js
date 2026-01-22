const Movie = require('../models/movie');

exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch {
    res.status(500).json({ message: 'Failed to load movies' });
  }
};