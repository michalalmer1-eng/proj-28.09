const express = require("express");
const cors = require("cors"); 
const routes = require("./routes/carRoutes");
const { login,logout } = require("./controller/carController");
const isLoggedin = require("./middlewares/authMiddleware");

const app = express();

app.use(cors());           
app.use(express.json());
app.use("/", routes);
app.post("/login", login);
app.post("/logout", logout);
app.get("/items", isLoggedin, (req, res) => {
  res.json(items);
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});



