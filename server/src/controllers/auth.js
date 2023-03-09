const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();
const User = require("../models/user");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400);

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
      // res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
      res.json({ accessToken, refreshToken });
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    return res.status(500).json({ error: error ?? "Internal server error" });
  }
};

module.exports = { login };
