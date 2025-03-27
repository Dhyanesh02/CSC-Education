const express = require('express');
const router = express.Router();
const cors = require('cors');
const { sendVerificationCode, verifyCode } = require('../controllers/verificationController');

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true
};

router.post('/send-verification', cors(corsOptions), sendVerificationCode);
router.post('/verify-code', cors(corsOptions), verifyCode);

module.exports = router; 