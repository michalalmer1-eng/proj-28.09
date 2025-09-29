const express = require("express");
const router = express.Router();
const { healthCheck, getAllItems,addItem, login,logout } = require("../controller/carController");

router.get("/", healthCheck);
router.get("/items", getAllItems);
router.post("/items", addItem);
router.post("/login", login);
router.post("/logout", logout);

module.exports = router;
