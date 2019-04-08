const Post = require("../models/post"),
  {
    IncomingForm
  } = require("formidable"),
  fs = require("fs"),
  _ = require("lodash"),
  jwt = require("jsonwebtoken"),
  User = require("../models/user");

exports.getPosts = (req, res) => {
  const posts = Post.find()
    .sort({
      created: -1
    })
    .populate("postedBy", "_id name ")
    .then(posts => {
      res.json({
        posts
      });
    })
    .catch(error => console.error(error));
};

exports.createPost = async (req, res, next) => {
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
    post.save((error, result) => {
      if (error) {
        return res.status(400).json({
          error
        });
      }
      res.json(result);
    });
  });
};

exports.postsByUser = (req, res) => {
  Post.find({
      postedBy: req.profile._id
    })
    .populate("postedBy", "_id name photo")
    .sort({
      created: -1
    })
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
    .populate("postedBy", "id name photo")
    .populate("comments.postedBy", "_id name photo")
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

exports.postPhoto = (req, res, next) => {
  res.header("Content-Type", req.post.photo.contentType);
  return res.send(req.post.photo.data);
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
      .json({
        error: "You are not the creator of this post!"
      });
  }
  next();
};

exports.getPostById = (req, res) => {
  const {
    post
  } = req;
  if (!post) {
    return res.status(404).json({
      error: "Post not found!"
    });
  }
  res.json({
    post
  });
};

exports.deletePost = (req, res, next) => {
  let post = req.post;
  post.remove((error, post) => {
    if (error) {
      return res.status(400).json({
        error
      });
    }
    res.json({
      message: "Post deleted successfully"
    });
  });
};

exports.like = (req, res) => {
  Post.findOneAndUpdate({
    _id: req.body.postId
  }, {
    $addToSet: {
      likes: req.body.userId
    }
  }, {
    new: true
  }).exec((error, result) => {
    if (error) {
      return res.status(400).json({
        error
      });
    }
    res.json({
      result
    });
  });
};

exports.unlike = (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId, {
      $pull: {
        likes: req.body.userId
      }
    }, {
      new: true
    }
  ).exec((error, result) => {
    if (error) {
      return res.status(400).json({
        error
      });
    }
    res.json({
      result
    });
  });
};

exports.comment = (req, res) => {
  let comment = req.body.comment;
  comment.postedBy = req.body.userId;
  Post.findOneAndUpdate({
      _id: req.body.postId
    }, {
      $push: {
        comments: comment
      },
      $inc: {
        commentsCount: 1
      }
    }, {
      new: true
    })
    .populate("comments.postedBy", "_id name photo")
    .populate("postedBy", "_id name photo")
    .exec((error, result) => {
      if (error) {
        return res.status(400).json({
          error
        });
      }
      res.json({
        result
      });
    });
};

exports.uncomment = (req, res) => {
  let comment = req.body.comment;
  Post.findOneAndUpdate({
      _id: req.body.postId
    }, {
      $pull: {
        comments: {
          _id: comment._id
        }
      },
      $inc: {
        commentsCount: -1
      }
    }, {
      new: true
    })
    .populate("comments.postedBy", "_id name photo")
    .populate("postedBy", "_id name photo")
    .exec((error, result) => {
      if (error) {
        return res.status(400).json({
          error
        });
      }
      res.json({
        result
      });
    });
};

exports.getPostsFollowing = (req, res) => {
  User.findById(req.auth._id, (error, result) => {
    if (error) {
      return res.status(400).json({
        error
      });
    }
    const {
      following
    } = result;
    Post.find({
      postedBy: {
        $in: following
      }
    }, (err, posts) => {
      if (err) {
        return res.status(400).json({
          err
        });
      }
      res.json({
        posts
      });
    })
  })
}