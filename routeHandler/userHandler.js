const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/userCreateModel");


// USER SIGNUP
router.post("/signup", async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const response = await User.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: hashedPassword,
        });

        res.status(200).json({
            code: 201,
            status: 'success',
            message: "Signup successful!",
        });
    } catch (error) {
        return res.status(500).json({
            code: 500,
            status: 'failed',
            msg: error.message,
        });
    }
});

//USER LOGIN
router.post("/login", async (req, res) => {
    try {
        const user = await User.find({
            email: req.body.email
        });
        if (user && user.length > 0) {
            const isValidPassword = await bcrypt.compare(req.body.password, user[0].password);

            if (isValidPassword) {
                const token = jwt.sign({
                    email: user[0].email,
                    first_name: user[0].first_name,
                    last_name: user[0].last_name,
                    userId: user[0]._id,
                }, process.env.JWT_SECRET, {
                    expiresIn: '7d'
                });

                res.status(200).json({
                    "access_token": token,
                    "message": "User Login successful!"
                });
            }else{
                res.status(401).json({
                    code: 401,
                    status: 'failed',
                    message: "Authentication field!",
                });
            }
        }
    } catch (error) {
        return res.status(500).json({
            code: 500,
            status: 'failed',
            message: error.message,
        });
    }
});

module.exports = router;