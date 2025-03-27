const nodemailer = require('nodemailer');
const crypto = require('crypto');

// Store verification codes temporarily (in production, use Redis or similar)
const verificationCodes = new Map();

// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Generate a random 6-digit code
const generateVerificationCode = () => {
  return crypto.randomInt(100000, 999999).toString();
};

// Send verification code
const sendVerificationCode = async (req, res) => {
  try {
    const { email } = req.body;

    // Generate verification code
    const code = generateVerificationCode();
    
    // Store the code with expiration (5 minutes)
    verificationCodes.set(email, {
      code,
      expires: Date.now() + 5 * 60 * 1000 // 5 minutes
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Email Verification Code',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e3a8a;">Email Verification</h2>
          <p>Your verification code is:</p>
          <h1 style="color: #ffde59; font-size: 32px; letter-spacing: 5px;">${code}</h1>
          <p>This code will expire in 5 minutes.</p>
          <p>If you didn't request this code, please ignore this email.</p>
        </div>
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Verification code sent successfully' });
  } catch (error) {
    console.error('Error sending verification code:', error);
    res.status(500).json({ message: 'Failed to send verification code' });
  }
};

// Verify code
const verifyCode = async (req, res) => {
  try {
    const { email, code } = req.body;

    // Get stored verification data
    const verificationData = verificationCodes.get(email);

    if (!verificationData) {
      return res.status(400).json({ message: 'No verification code found for this email' });
    }

    // Check if code has expired
    if (Date.now() > verificationData.expires) {
      verificationCodes.delete(email);
      return res.status(400).json({ message: 'Verification code has expired' });
    }

    // Verify code
    if (verificationData.code !== code) {
      return res.status(400).json({ message: 'Invalid verification code' });
    }

    // Remove the used code
    verificationCodes.delete(email);

    res.status(200).json({ message: 'Code verified successfully' });
  } catch (error) {
    console.error('Error verifying code:', error);
    res.status(500).json({ message: 'Failed to verify code' });
  }
};

module.exports = {
  sendVerificationCode,
  verifyCode
}; 