const express = require("express");
const cookieParser = require("cookie-parser"); // handle user cookies
const app = express();
const PORT = process.env.PORT || 3000;
const path = require("path");


app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // enable cookies
app.use(express.static(path.join(__dirname, 'public')));

let posts = [];

// homepage
app.get("/", (req, res) => {
  const user = req.cookies.username; // get user from browser

  if (!user) {
    res.redirect("/signup");
  } else {
    res.render("index", { posts: posts, user: user });
  }
});

// signup page
app.get("/signup", (req, res) => {
  res.render("signup");
});

// handle signup
app.post("/signup", (req, res) => {
  const username = req.body.username;

  res.cookie("username", username); // save user in browser
  res.redirect("/");
});

// create page
app.get("/create", (req, res) => {
  res.render("create");
});

// handle post
app.post("/post", (req, res) => {
  console.log("POST RECEIVED:", req.body); 

const user = req.cookies.username;

let newPost = {
  username: user,
  content: req.body.content,
  time: new Date().toLocaleString()
};

  posts.push(newPost);

  console.log("POSTS ARRAY:", posts); 

  res.redirect("/");
});

// start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});