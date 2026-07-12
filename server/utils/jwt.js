const jwt = require("jsonwebtoken");

// Generate Token
const generateToken = (user) => {

    return jwt.sign(

        {
            id: user.user_id,
            role: user.role
        },

        process.env.JWT_SECRET,

        {
            expiresIn: "24h"
        }

    );

};

// Verify Token
const verifyToken = (token) => {

    return jwt.verify(
        token,
        process.env.JWT_SECRET
    );

};

module.exports = {
    generateToken,
    verifyToken
};