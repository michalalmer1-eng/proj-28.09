// utils/generateToken.js
const crypto = require("crypto");

const generateToken = () => {
  return crypto.randomBytes(32).toString("hex"); // מחזיר סטרינג אקראי ארוך
};

module.exports = generateToken;
