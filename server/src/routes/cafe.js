const express = require("express");
const router = express.Router();

const { createCafe, getCafe } = require("../controllers/cafe");

router.post("/", createCafe);
router.get("/", getCafe);

module.exports = router;
