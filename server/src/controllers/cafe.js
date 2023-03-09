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

module.exports = { createCafe };
