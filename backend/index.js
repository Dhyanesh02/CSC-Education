require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const adminRoutes = require('./routes/adminRoutes');
const courseRoutes = require('./routes/courseRoutes');
const path = require('path');
const fs = require('fs');
const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Database connection
connectDB();

// Routes
app.use('/api/admin', adminRoutes);
app.use('/api', courseRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));