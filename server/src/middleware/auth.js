const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleWare = (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    return next();
  } catch (e) {
    return res.status(401).json({ message: "Invalid token!" });
  }
};

module.exports = authMiddleWare;
