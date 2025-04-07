const jwt = require("jsonwebtoken");

const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const adminEmail = "mortaldev@gmail.com";
        const adminPassword = "mortal4777";

        if (email !== adminEmail) {
            return res.status(400).json({
                variant: "error",
                message: "Email is incorrect",
                innerData: null
            });
        }

        if (password === adminPassword) {
            const token = jwt.sign({ admin: true }, process.env.JWT_SECRET_KEY);
            res.status(200).json({
                variant: "success",
                message: "Successfully logged in as admin",
                innerData: { token }
            });
        } else {
            res.status(400).json({
                variant: "error",
                message: "Password is incorrect",
                innerData: null
            });
        }
    } catch {
        res.status(500).json({
            variant: "error",
            message: "server error",
            innerData: null
        });
    }
};

module.exports = { loginAdmin };
