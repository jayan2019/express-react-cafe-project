const express = require("express");
const router = express.Router();

const { createUser } = require("../controllers/user");
const { login, logout, refresh } = require("../controllers/auth");

router.post("/login", login);
router.get("/logout", logout);
router.post("/refresh", refresh);
router.post("/create", createUser);

module.exports = router;
