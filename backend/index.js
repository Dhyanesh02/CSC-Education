require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const adminRoutes = require('./routes/adminRoutes');
const courseRoutes = require('./routes/courseRoutes');
const path = require('path');
const fs = require('fs');
const { error } = require('console');
const app = express();

// Middleware
const corsOptions = {
  origin: ['https://csc-education.vercel.app', process.env.CLIENT_URL],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-Token', 'X-Requested-With', 'Accept', 'Accept-Version', 'Content-Length', 'Content-MD5', 'Date', 'X-Api-Version'],
  credentials: true,
  optionsSuccessStatus: 200,
  preflightContinue: false
};

app.use(express.json());
app.use(cors(corsOptions));

// Add OPTIONS handling for preflight requests
app.options('*', cors(corsOptions));

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

app.get('/', (req, res) => {
  res.send({
    activeStatus: true,
    error: false,
  })
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));