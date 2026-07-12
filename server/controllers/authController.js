const authService = require("../services/authService");

/*
    REGISTER
*/

exports.register = async (req, res) => {

    try {

        const result = await authService.register(req.body);

        res.status(201).json({

            success: true,
            message: "User registered successfully",
            userId: result.userId

        });

    } catch (err) {

        res.status(400).json({

            success: false,
            message: err.message

        });

    }

};

/*
    LOGIN
*/

exports.login = async (req, res) => {

    try {

        const { email, password } = req.body;

        const result = await authService.login(
            email,
            password
        );

        res.status(200).json({

            success: true,
            message: "Login successful",
            token: result.token,
            user: result.user

        });

    } catch (err) {

        res.status(401).json({

            success: false,
            message: err.message

        });

    }

};

/*
    PROFILE
*/

exports.profile = async (req, res) => {

    try {

        const user = await authService.profile(req.user.id);

        res.status(200).json({

            success: true,
            data: user

        });

    } catch (err) {

        res.status(404).json({

            success: false,
            message: err.message

        });

    }

};