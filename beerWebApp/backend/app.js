const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const Post = require("./models/post");
const mongoose = require("mongoose");
const router = express.Router();
const app = express();

mongoose
  .connect(
    "mongodb+srv://ptangney:7DlwZSUiIQ7PxijB@realmcluster.vdnjz.mongodb.net/beer-db"
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// CORS SETUP
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/posts", (req, res, next) => {
  //create new post object | managed by mongoose
  const post = new Post({
    beerTitle: req.body.beerTitle,
    tagline: req.body.tagline,
    firstBrewed: req.body.firstBrewed,
    abv: req.body.abv,
    imageUrl: req.body.imageUrl,
    description: req.body.description,
    brewersTips: req.body.brewersTips,
  });
  console.log(post);
  // Mongoose will create the query and save to database .save()
  post.save().then((createPost) => {
    //201 - added new resource -
    res.status(201).json({
      message: "Post added successfully",
      postId: createPost._id
    });
  });
});

// Set our api routes

app.get("/api/posts", (req, res, next) => {
  //Async task - wait for doc to arrive then access
  Post.find().then((documents) => {
    console.log(documents);
    res.status(200).json({
      message: "Posts Fetched Successfully",
      posts: documents,
    });
  });
  //set to 200 for success
});


// Setup Random API Route for Button - Random
app.get("/api/posts/random", (req, res, next) => {
  let fetchedRandomPost;
  Post.count().exec((err, count) => {
    // Get a random entry
    var random = Math.floor(Math.random() * count);
    // Again query all users but only fetch one offset by our random #
    Post.findOne()
      .skip(random)
      .exec()
      .then((documents) => {
        fetchedRandomPost = documents;
        res.status(200).json({
          message: "Fetched Random Post!",
          posts: fetchedRandomPost,
        });
      });
  });
});

module.exports = app;
