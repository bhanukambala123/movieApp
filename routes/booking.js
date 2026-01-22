const express = require('express');
const router = express.Router();
const { bookTicket, getUserBookings } = require('../controllers/bookingController');
const verifyToken = require('../middleware/authMiddleware');
const authenticateUser = require('../middleware/authMiddleware');
const Booking = require('../models/booking');


router.post('/', verifyToken, bookTicket);
router.get('/my-bookings', verifyToken, getUserBookings);
router.delete('/:id', authenticateUser, async (req, res) => {
  try {
    const result = await Booking.deleteOne({ _id: req.params.id, user: req.user.id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Booking not found or unauthorized' });
    }
    res.json({ message: 'Booking cancelled' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;