const express = require("express");
const cors = require("cors");

const cafeRoutes = require("./routes/cafe");
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const authMiddleWare = require("./middleware/auth");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use(authMiddleWare);
app.use("/cafes", cafeRoutes);
app.use("/users", userRoutes);

module.exports = app;
