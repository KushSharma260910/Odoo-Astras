const db = require("../config/db");

exports.getAllDrivers = async () => {

    const [rows] = await db.query(

        "SELECT * FROM drivers ORDER BY driver_id DESC"

    );

    return rows;

};

exports.getDriverById = async (id) => {

    const [rows] = await db.query(

        "SELECT * FROM drivers WHERE driver_id=?",

        [id]

    );

    return rows[0];

};

exports.getAvailableDrivers = async () => {

    const [rows] = await db.query(

        "SELECT * FROM drivers WHERE status='AVAILABLE'"

    );

    return rows;

};

exports.createDriver = async (driver) => {

    const sql = `

        INSERT INTO drivers

        (

            name,

            license_number,

            license_category,

            license_expiry,

            phone,

            safety_score,

            status

        )

        VALUES (?,?,?,?,?,?,?)

    `;

    const values = [

        driver.name,

        driver.license_number,

        driver.license_category,

        driver.license_expiry,

        driver.phone,

        driver.safety_score,

        driver.status

    ];

    const [result] = await db.query(sql, values);

    return result;

};

exports.updateDriver = async (id, driver) => {

    const sql = `

        UPDATE drivers

        SET

        name=?,

        license_number=?,

        license_category=?,

        license_expiry=?,

        phone=?,

        safety_score=?,

        status=?

        WHERE driver_id=?

    `;

    const values = [

        driver.name,

        driver.license_number,

        driver.license_category,

        driver.license_expiry,

        driver.phone,

        driver.safety_score,

        driver.status,

        id

    ];

    const [result] = await db.query(sql, values);

    return result;

};

exports.deleteDriver = async (id) => {

    const [result] = await db.query(

        "DELETE FROM drivers WHERE driver_id=?",

        [id]

    );

    return result;

};