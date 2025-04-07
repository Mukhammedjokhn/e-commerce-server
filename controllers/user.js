const { Users, validationUser } = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { config } = require("dotenv");
config();

const getUsers = async (req, res) => {
    try {
        const users = await Users.find()
            .sort({ _id: -1 })
            .select({ password: 0 });
        res.status(200).json({
            variant: "success",
            message: "all users",
            innerData: users
        });
    } catch {
        res.status(500).json({
            variant: "error",
            message: "server error",
            innerData: null
        });
    }
};

const signInUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(400).json({
                variant: "error",
                message: "Email is incorrect",
                innerData: null
            });
        }
        bcrypt.compare(password, user.password, (err, result) => {
            if (result) {
                const token = jwt.sign(
                    { _id: user._id, admin: user.admin },
                    process.env.JWT_SECRET_KEY
                );
                res.status(200).json({
                    variant: "success",
                    message: "successfully login",
                    innerData: { user, token }
                });
            } else {
                res.status(400).json({
                    variant: "error",
                    message: "Password is incorrect",
                    innerData: null
                });
            }
        });
    } catch {
        res.status(500).json({
            variant: "error",
            message: "server error",
            innerData: null
        });
    }
};

const signUpUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const { error } = validationUser(req.body);
        if (error) {
            return res.status(400).json({
                variant: "error",
                message: error.details[0].message,
                innerData: null
            });
        }

        const existingUser = await Users.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                variant: "error",
                message: "Email already exists",
                innerData: null
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new Users({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();

        const token = jwt.sign(
            { _id: newUser._id, admin: newUser.admin },
            process.env.JWT_SECRET_KEY
        );

        res.status(201).json({
            variant: "success",
            message: "User successfully registered",
            innerData: { user: newUser, token }
        });
    } catch (err) {
        res.status(500).json({
            variant: "error",
            message: "server error",
            innerData: null
        });
    }
};

const currentUser = async (req, res) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({
                variant: "error",
                message: "Access denied. No token provided.",
                innerData: null
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const user = await Users.findById(decoded._id).select({
            password: 0,
            _id: 0,
            __v: 0
        });

        if (!user) {
            return res.status(404).json({
                variant: "error",
                message: "User not found",
                innerData: null
            });
        }

        res.status(200).json({
            variant: "success",
            message: "Current user fetched successfully",
            innerData: user
        });
    } catch (err) {
        res.status(500).json({
            variant: "error",
            message: "Server error",
            innerData: null
        });
    }
};

module.exports = { getUsers, signInUser, signUpUser, currentUser };
