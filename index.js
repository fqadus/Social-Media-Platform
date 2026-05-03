const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');

app.set("view engine", "ejs");
app.use(express.static(path.join(_dirname, 'public')));

let posts = [];
let currentUser = "";

// homepage
app.get("/", (req, res) => {
  if (currentUser === "") {
    res.redirect("/signup");
  } else {
    res.render("index", { posts: posts, user: currentUser });
  }
});

// signup page
app.get("/signup", (req, res) => {
  res.render("signup");
});

// handle signup
app.post("/signup", (req, res) => {
  currentUser = req.body.username;
  res.redirect("/");
});

// create page
app.get("/create", (req, res) => {
  res.render("create");
});

// handle post
app.post("/post", (req, res) => {
  console.log("POST RECEIVED:", req.body); // DEBUG

  let newPost = {
  username: currentUser,
  content: req.body.content,
  time: new Date().toLocaleString()
  };

  posts.push(newPost);

  console.log("POSTS ARRAY:", posts); // DEBUG

  res.redirect("/");
});

// start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});