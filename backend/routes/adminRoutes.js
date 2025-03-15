const express = require('express');
const { loginAdmin, registerAdmin } = require('../controllers/adminController');
const adminAuth = require('../middleware/auth');
const router = express.Router();

// Public routes
router.post('/register', registerAdmin);
router.post('/login', loginAdmin);

// Protected route
router.get('/dashboard', adminAuth, (req, res) => {
  res.json({ message: 'Welcome to Admin Dashboard', adminId: req.adminId });
});

module.exports = router;