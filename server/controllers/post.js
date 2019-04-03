const Post = require("../models/post"),
  { IncomingForm } = require("formidable"),
  fs = require("fs"),
  _ = require("lodash"),
  jwt = require("jsonwebtoken"),
  User = require("../models/user");

exports.getPosts = (req, res) => {
  const posts = Post.find()
    .populate("postedBy", "_id name ")
    .then(posts => {
      res.json({
        posts
      });
    })
    .catch(error => console.error(error));
};

exports.createPost = (req, res, next) => {
  let form = new IncomingForm();
  form.keepExtensions = true;
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded"
      });
    }
    let post = new Post(fields);
    const user = await User.findById(req.auth._id);
    user.salt = undefined;
    user.hashed_password = undefined;
    post.postedBy = user;
    if (files.photo) {
      post.photo.data = fs.readFileSync(files.photo.path);
      post.photo.contentType = files.photo.type;
    }
  });
  post.save((error, result) => {
    if (error) {
      return res.status(400).json({
        error
      });
    }
    res.json(result);
  });
};

exports.postsByUser = (req, res) => {
  Post.find({
    postedBy: req.profile._id
  })
    .populate("postedBy", "_id name")
    .sort("created")
    .exec((error, posts) => {
      if (error) {
        return res.status(400).json({
          error
        });
      }
      res.json(posts);
    });
};

exports.postById = (req, res, next, id) => {
  Post.findById(id)
    .populate("postedBy", "id name")
    .exec((error, post) => {
      if (error || !post) {
        return res.status(400).json({
          error
        });
      }
      req.post = post;
      next();
    });
};

exports.updatePost = (req, res, next) => {
  let post = req.post;
  post = _.extend(post, req.body);
  post.updated = Date.now();
  post.save(error => {
    if (error) {
      res.status(400).json({
        error
      });
    }
    res.json(post);
  });
};

exports.isPoster = (req, res, next) => {
  if (req.post.postedBy._id != req.auth._id) {
    return res
      .status(403)
      .json({ error: "You are not the creator of this post!" });
  }
  next();
};

exports.deletePost = (req, res, next) => {
  let post = req.post;
  post.remove((error, post) => {
    if (error) {
      return res.status(400).json({ error });
    }
    res.json({ message: "Post deleted successfully" });
  });
};
