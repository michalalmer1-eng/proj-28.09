const { items, users } = require("../Db/Db");

const healthCheck = (req, res) => {
  res.send("שלום, השרת פועל!");
};

const getAllItems = (req, res) => {
  res.json(items);
};

const login = (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    res.send("התחברת בהצלחה");
  } else {
    res.status(401).send("שם משתמש או סיסמא שגויים");
  }
};

module.exports = { healthCheck, getAllItems, login };
