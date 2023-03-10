const express = require("express");
const router = express.Router();

const { getUsers, getUserById } = require("../controllers/user");

router.get("/", getUsers);
router.get("/:id", getUserById);

module.exports = router;
