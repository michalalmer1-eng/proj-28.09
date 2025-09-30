const { activeTokens } = require("../Db/Db");

const isLoggedin = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; 

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  if (!activeTokens.includes(token)) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  next();
};

module.exports = isLoggedin;
