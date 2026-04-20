const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const DB_URL = "mongodb://127.0.0.1:27017/mydb";

// connect MongoDB
mongoose.connect(DB_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// schema
const userSchema = new mongoose.Schema({
  emailid: String,
  password: String,
  address: String
});

const User = mongoose.model("User", userSchema);

// POST API
app.get("/login", async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET API
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// server start
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
