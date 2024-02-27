require("dotenv").config();
const cors = require("cors");
const connectDB = require("./connectDB");
const express = require("express");
const Book = require("./models/Books");

const app = express();
const PORT = process.env.PORT || 8000;

connectDB();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// get books
app.get("/api/books", async (req, res) => {
  try {
    // const data = await Book.find({}).limit(2);
    const data = await Book.find({});
    res.json(data );
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching books." });
  }
});

app.get("/", (req, res) => {
  res.json("Hello Mate!");
});
app.get("*", (req, res) => {
  res.sendStatus("404");
});
app.get("/", (req, res) => {
  res.json("Hello Mate!");
});
app.listen(PORT, () => {
  console.log(`Server is running on Port: ${PORT}`);
});
