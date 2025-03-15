const express = require('express');
const { loginAdmin, registerAdmin } = require('../controllers/adminController');
const adminAuth = require('../middleware/auth');
const router = express.Router();
const cors = require('cors');

const corsOptions = {
  origin: ['https://csc-education.vercel.app', process.env.CLIENT_URL],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

// Public routes with CORS
router.post('/register', cors(corsOptions), registerAdmin);
router.post('/login', cors(corsOptions), loginAdmin);

// Protected route
router.get('/dashboard', adminAuth, (req, res) => {
  res.json({ message: 'Welcome to Admin Dashboard', adminId: req.adminId });
});

module.exports = router;