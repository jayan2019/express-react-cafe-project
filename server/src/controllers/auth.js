const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();
const User = require("../models/user");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.sendStatus(400);

    const foundUser = await User.findByEmail({ email });
    if (!foundUser) return res.sendStatus(401);

    const match = await bcrypt.compare(password, foundUser.password);
    if (match) {
      const accessToken = jwt.sign(
        { email: foundUser.email },
        process.env.ACCESS_TOKEN_SECRET
      );
      const refreshToken = jwt.sign(
        { email: foundUser.email },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1d" }
      );

      await User.updateToken({ refresh_token: refreshToken, id: foundUser.id });
      res.json({ accessToken, refreshToken });
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    return res.status(500).json({ error: error ?? "Internal server error" });
  }
};

const logout = async (req, res) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");
    const decodedUser = jwt.decode(token, process.env.ACCESS_TOKEN_SECRET);
    const foundUser = await User.findByEmail({ email: decodedUser.email });
    if (!foundUser) return res.sendStatus(401);

    if (!foundUser.refresh_token)
      return res.status(400).json({ message: "Already signout!" });

    await User.updateToken({ refresh_token: null, id: foundUser.id });
    res.sendStatus(204);
  } catch (e) {
    return res.status(500);
  }
};

const refresh = async (req, res) => {
  try {
    const { refresh_token } = req.body;
    if (!refresh_token) return res.sendStatus(400);

    const foundUser = await User.findByToken({ token: refresh_token });
    if (!foundUser) return res.status(400).json({ message: "No user found!" });

    const accessToken = jwt.sign(
      { email: foundUser.email },
      process.env.ACCESS_TOKEN_SECRET
    );
    const refreshToken = jwt.sign(
      { email: foundUser.email },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    await User.updateToken({ refresh_token: refreshToken, id: foundUser.id });
    res.json({ accessToken, refreshToken });
  } catch (e) {
    return res.status(500);
  }
};

module.exports = { login, logout, refresh };
