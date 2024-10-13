const jwt = require('jsonwebtoken');

// Middleware to verify the JWT
const jwtAuthMiddleWare = (req, res, next) => {

    const authorization = req.headers.authorization;
    if (!authorization) {
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }
    const token = req.headers.authorization?.split(' ')[1]; // Access authorization header
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach decoded user data to request
        next(); // Proceed to next middleware or route handler
    } catch (err) {
        console.error("Token verification error:", err);
        return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
};

// Function to generate JWT
const generateToken = (userData) => {
    return jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: '1h' }); // Include expiration time
};

module.exports = { generateToken, jwtAuthMiddleWare };
