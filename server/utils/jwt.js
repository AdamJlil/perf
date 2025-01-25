const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'; // In production, use environment variable

class JWTUtil {
    static generateToken(user) {
        return jwt.sign(
            {
                id: user.id,
                email: user.email,
                type: user.type,
                roles: user.roles
            },
            JWT_SECRET,
            { expiresIn: '24h' }
        );
    }

    static verifyToken(token) {
        try {
            return jwt.verify(token, JWT_SECRET);
        } catch (error) {
            throw new Error('Invalid token');
        }
    }
}

module.exports = JWTUtil;
