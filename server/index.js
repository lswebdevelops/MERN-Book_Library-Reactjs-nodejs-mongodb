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
app.use("/uploads", express.static("uploads"))

// get books
app.get("/api/books", async (req, res) => {
  try {

    const category = req.query.category;
    // const stars = req.query.stars;
    // console.log(category);

    const filter = {};
    if(category) {
      filter.category = category

    }


    // const data = await Book.find({}).limit(2);
    const data = await Book.find(filter);
    res.json(data );
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching books." });
  }
});




// book page
app.get("/api/books/:slug", async (req, res) => {
  try {

    const slupParam = req.params.slug
    const data = await Book.findOne({slug: slupParam});
    res.json(data );
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching books." });
  }
});


// add book
app.post("/api/books", async (req, res) => {
  try {
console.log(req.body);
   
    const newBook = new Book({
      title: req.body.title,
      slug: req.body.slug,
      stars: req.body.stars,
      description: req.body.description,
      category: req.body.category,
      // thumbnail: req.body.thumbnail
    })
    await Book.create(newBook)
    res.json("data submited" );
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







// 1:35:58 / 2:02:53 Add Book

