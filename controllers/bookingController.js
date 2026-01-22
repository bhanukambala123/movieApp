const Movie = require('../models/movie');
const Booking = require('../models/booking');

exports.bookTicket = async (req, res) => {
  try {
    const { movie, seat } = req.body;

    const movieDoc = await Movie.findOne({ title: movie });
    if (!movieDoc) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    if (movieDoc.category === 'upcoming') {
      return res.status(403).json({ message: 'Movie not released yet' });
    }

    const booking = new Booking({
      user: req.user.id,
      movie,
      seat,
      posterUrl: movieDoc.posterUrl
    });

    await booking.save();
    res.status(201).json({ message: 'Booking successful' });
  } catch (err) {
    console.error('Booking error:', err);
    res.status(500).json({ message: 'Booking failed' });
  }
};

exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id });
    res.json(bookings);
  } catch (err) {
    console.error('Fetch bookings error:', err);
    res.status(500).json({ message: 'Failed to fetch bookings' });
  }
};