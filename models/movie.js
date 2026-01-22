const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: String,
  description: String,
  posterUrl: String,
  category: String // 'available', 're-release', or 'upcoming'
});

module.exports = mongoose.model('Movie', movieSchema);