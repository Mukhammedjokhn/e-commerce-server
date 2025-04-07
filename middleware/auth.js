const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = (req, res, next) => {
    const token = req.headers.authentication;
    if (!token) {
        return res.status(400).json({
            variant: "error",
            messsage: "token not found",
            innerData: null
        });
    }
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decode) => {
        if (err) {
            return res.status(400).json({
                variant: "error",
                messsage: "token is incorrect",
                innerData: null
            });
        }
        res.user = decode;
        next();
    });
};

module.exports = { auth };
