const jwt = require('jsonwebtoken');

const adminAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Check if the authorization header is present and starts with 'Bearer '
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized: No token provided or malformed token' });
    }

    // Extract the token from the header
    const token = authHeader.split(' ')[1];

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded admin ID to the request object
    req.adminId = decoded.id;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error('Authentication error:', error);

    // Handle specific JWT errors
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired. Please log in again.' });
    }

    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token. Please log in again.' });
    }

    // Handle other unexpected errors
    res.status(500).json({ message: 'Internal server error during authentication' });
  }
};

module.exports = adminAuth;