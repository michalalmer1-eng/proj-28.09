const express = require("express");
const router = express.Router();
const { healthCheck, getAllItems, login } = require("../controller/carController");

router.get("/", healthCheck);
router.get("/items", getAllItems);
router.post("/login", login);

module.exports = router;
