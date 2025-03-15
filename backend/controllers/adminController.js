const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerAdmin = async (req, res) => {
  try {
    // Log the request body for debugging
    //console.log('Request body:', req.body);

    const { email, password } = req.body;

    // Validate email and password
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create the admin
    const admin = await Admin.create({ email, password: hashedPassword });

    // Generate a JWT token
    const token = jwt.sign(
      { email: admin.email, id: admin._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Return the admin and token
    res.status(201).json({ result: admin, token });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const loginAdmin = async (req, res) => {
  try {
    // Log the request body for debugging
    //console.log('Request body:', req.body);

    const { email, password } = req.body;

    // Validate email and password
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find the admin by email
    const existingAdmin = await Admin.findOne({ email });
    if (!existingAdmin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    // Compare passwords
    const isPasswordCorrect = await bcrypt.compare(password, existingAdmin.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { email: existingAdmin.email, id: existingAdmin._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Return the admin and token
    res.status(200).json({ result: existingAdmin, token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { registerAdmin, loginAdmin };