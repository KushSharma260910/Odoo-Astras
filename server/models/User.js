const db = require("../config/db");

// Find by Email
const findByEmail = async (email) => {

    const [rows] = await db.query(
        "SELECT * FROM users WHERE email = ?",
        [email]
    );

    return rows[0];
};

// Find by ID
const findById = async (id) => {

    const [rows] = await db.query(
        `SELECT
            user_id,
            name,
            email,
            role,
            status
         FROM users
         WHERE user_id = ?`,
        [id]
    );

    return rows[0];
};

// Create User
const createUser = async (user) => {

    const sql = `
        INSERT INTO users
        (
            name,
            email,
            password,
            role,
            status
        )
        VALUES (?,?,?,?,?)
    `;

    const [result] = await db.query(sql, [
        user.name,
        user.email,
        user.password,
        user.role,
        "ACTIVE"
    ]);

    return result;
};

module.exports = {
    findByEmail,
    findById,
    createUser
};