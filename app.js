const authenticateUser = require('./middleware/authMiddleware'); // ✅ Adjust path if it's in /middleware
const cors = require("cors");
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const app = express();
const port=process.env.PORT || 4000;
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

// Routes
const authRoutes = require('./routes/auth');
const bookingRoutes = require('./routes/booking');
const movieRoutes = require('./routes/movies');

app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/movies', movieRoutes);
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/welcome.html');
});
app.delete('/api/bookings/:id', authenticateUser, async (req, res) => {
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
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

