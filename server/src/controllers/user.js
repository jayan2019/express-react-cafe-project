const bcrypt = require("bcrypt");

const User = require("../models/user");

const createUser = async (req, res) => {
  try {
    const { email, password, first_name, last_name, cafe_id } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email,
      password: hashedPassword,
      first_name,
      last_name,
      cafe_id,
    });
    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(500).json({ error: error ?? "Internal server error" });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.getAll();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: error ?? "Internal server error" });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: error ?? "Internal server error" });
  }
};

module.exports = { createUser, getUsers, getUserById };
