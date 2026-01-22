const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  movie: String,
  seat: String,
  posterUrl: String,
  bookedAt: { type: Date, default: Date.now }

});

module.exports = mongoose.model('Booking', bookingSchema);