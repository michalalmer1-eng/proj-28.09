const express = require("express");
const router = express.Router();
const { healthCheck, getAllItems, addItem, login, logout,register} = require("../controller/carController");
const isLoggedin = require("../middlewares/authMiddleware"); 

router.get("/", healthCheck);
router.get("/items", isLoggedin, getAllItems); 
router.post("/items", isLoggedin, addItem);   
router.post("/login", login);
router.post("/logout", logout);
router.post("/register", register); 

module.exports = router;
