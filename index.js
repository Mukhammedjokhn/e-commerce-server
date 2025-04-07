const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const { config } = require("dotenv");
config();

app.use(express.json());
app.use(cors());

mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("MongoDB is connected"))
    .catch(() => console.log("MongoDB is not connected"));

app.get("/", async (req, res) => {
    res.json("app is running");
});

const routers = require("./routes/router");
app.use("/", routers);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`${PORT} is listened`));
