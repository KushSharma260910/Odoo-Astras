const bcrypt = require("bcryptjs");

const User = require("../models/User");

const { generateToken } = require("../utils/jwt");

/*
    REGISTER
*/

const register = async (userData) => {

    // Check if email already exists

    const existingUser = await User.findByEmail(userData.email);

    if (existingUser) {
        throw new Error("Email already registered");
    }

    // Hash Password

    const hashedPassword = await bcrypt.hash(
        userData.password,
        10
    );

    userData.password = hashedPassword;

    // Save User

    const result = await User.createUser(userData);

    return {
        userId: result.insertId
    };

};

/*
    LOGIN
*/

const login = async (email, password) => {

    // Find User

    const user = await User.findByEmail(email);

    if (!user) {
        throw new Error("Invalid email or password");
    }

    // Check Status

    if (user.status !== "ACTIVE") {
        throw new Error("User account is inactive");
    }

    // Compare Password

    const isMatch = await bcrypt.compare(
        password,
        user.password
    );

    if (!isMatch) {
        throw new Error("Invalid email or password");
    }

    // Generate JWT

    const token = generateToken(user);

    return {

        token,

        user: {

            id: user.user_id,
            name: user.name,
            email: user.email,
            role: user.role

        }

    };

};

/*
    PROFILE
*/

const profile = async (id) => {

    const user = await User.findById(id);

    if (!user) {
        throw new Error("User not found");
    }

    return user;

};

module.exports = {

    register,

    login,

    profile

};