require('dotenv').config();
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY || 'fallback-secret-key';

const generateToken = (userId) => {
    console.log(`Generating token for user ID: ${userId}`);
    if (!userId) {
        throw new Error('User ID is required to generate token');
    }
    try {
        const token = jwt.sign({ userId }, SECRET_KEY, { expiresIn: '48h' });
        return token;
    } catch (error) {
        console.error('Token generation error:', error);
        throw new Error('Failed to generate authentication token');
    }
}

const getUserIdFromToken = (token) => {
    // console.log(`Verifying token: ${token}`); // Commented out to reduce logging
    if (!token) {
        throw new Error('Token is required');
    }
    try {
        const decodedToken = jwt.verify(token, SECRET_KEY);
        return decodedToken.userId;
    } catch (error) {
        // console.error('Token verification error:', error); // Commented out to reduce logging
        if (error.name === 'TokenExpiredError') {
            throw new Error('Token has expired');
        }
        if (error.name === 'JsonWebTokenError') {
            throw new Error('Invalid token');
        }
        throw new Error('Failed to verify token');
    }
}

module.exports = { generateToken, getUserIdFromToken };
