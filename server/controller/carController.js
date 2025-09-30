const { items, users, activeTokens } = require("../Db/Db");
const generateToken = require("../utils/generateToken");

// Health check
const healthCheck = (req, res) => {
  res.send("שלום, השרת פועל!");
};

// GET 
const getAllItems = (req, res) => {
  res.json(items);
};
const getAllUsers = (req, res) => {
  res.json(users);
}

// POST 
const addItem = (req, res) => {
  const newItem = req.body;

  if (!newItem || !newItem.title || !newItem.author) {
    return res.status(400).send("חסר מידע על הספר (title / author)");
  }

  newItem.id = items.length + 1;

  items.push(newItem);
  res.status(201).json(newItem);
};

// Login
const login = (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "שם משתמש או סיסמא שגויים" });
  }

  const token = generateToken();
  activeTokens.push(token);

  console.log("User logged in:", username);
  console.log("Generated token:", token);
  console.log("Active tokens after login:", activeTokens);

  res.json({ token }); 
};
//logout
const logout = (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
    console.log("Active tokens:", activeTokens);
console.log("Token from request:", token);
  if (!token) {
    return res.status(400).json({ message: "Token missing" });
  }

  const index = activeTokens.indexOf(token);
  if (index > -1) {
    activeTokens.splice(index, 1);
    return res.json({ message: "Logged out successfully" });
  }

  res.status(404).json({ message: "Token not found" });
};
// Register
const register = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "חסר שם משתמש או סיסמה" });
  }

  // בדיקה אם המשתמש כבר קיים
  const existingUser = users.find((u) => u.username === username);
  if (existingUser) {
    return res.status(409).json({ message: "משתמש כבר קיים" });
  }

  // יצירת משתמש חדש
  const newUser = { username, password };
  users.push(newUser);

  res.status(201).json({ message: "נרשמת בהצלחה!", user: newUser });
};

module.exports = { healthCheck, getAllItems,getAllUsers, addItem, login, logout, register };
