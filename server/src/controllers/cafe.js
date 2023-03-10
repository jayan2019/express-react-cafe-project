const Cafe = require("../models/cafe");

const createCafe = async (req, res) => {
  try {
    const { name, address } = req.body;
    const newCafe = await Cafe.create({ name, address });
    return res.status(201).json(newCafe);
  } catch (error) {
    return res.status(500).json({ error: error ?? "Internal server error" });
  }
};

const getCafe = async (req, res) => {
  try {
    const cafes = await Cafe.getAll();
    return res.status(200).json(cafes);
  } catch (error) {
    return res.status(500).json({ error: error ?? "Internal server error" });
  }
};

module.exports = { createCafe, getCafe };
