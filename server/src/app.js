const express = require("express");
const cors = require("cors");

const cafeRoutes = require("./routes/cafe");
const userRoutes = require("./routes/user");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/cafes", cafeRoutes);
app.use("/users", userRoutes);

module.exports = app;
