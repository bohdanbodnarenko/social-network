const User = require("../models/user");
const _ = require("lodash"),
  jwt = require("jsonwebtoken"),
  {
    IncomingForm
  } = require("formidable"),
  fs = require("fs");

exports.userById = (req, res, next, id) => {
  User.findById(id)
    .populate("following", "_id name")
    .populate("followers", "_id name")
    .exec((err, user) => {
      if (err || !user) {
        return res.status(404).json({
          error: "User not found"
        });
      }
      req.profile = user;
      next();
    });
};

exports.confirmPassword = (req, res) => {
  const {
    password
  } = req.body;
  User.findById(req.auth._id).exec((err, user) => {
    if (err || !user) {
      return res.status(404).json({
        data: "User does not exist!"
      });
    }
    res.json({
      correct: user.authenticate(password)
    });
  });
};

exports.allUsers = (req, res) => {
  User.find((error, users) => {
    if (error) {
      return res.status(400).json({
        error
      });
    }
    users.map(user => {
      if (user.photo) {
        user.photo.data = undefined
      }
    })
    res.json({
      users
    });
  }).select("_id name email updated created photo");
};

exports.getUser = (req, res) => {
  const {
    profile
  } = req;
  profile.hashed_password = undefined;
  profile.salt = undefined;
  if (profile.photo) {
    profile.photo.data = undefined
  }
  res.json(profile);
};

exports.userPhoto = (req, res, next) => {
  if (req.profile.photo) {
    res.header("Content-Type", req.profile.photo.contentType);
    return res.send(req.profile.photo.data);
  }
  next();
};

exports.updateUser = (req, res, next) => {
  let form = new IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Photo could not be uploaded"
      });
    }
    let user = req.profile;
    user = _.extend(user, fields);
    user.updated = Date.now();

    if (files.photo) {
      user.photo.data = fs.readFileSync(files.photo.path);
      user.photo.contentType = files.photo.type;
    }

    user.save((error, result) => {
      if (err) {
        return res.status(400).json({
          error
        });
      }
      user.hashed_password = undefined;
      user.salt = undefined;
      if (user.photo) {
        user.photo.data = undefined
      }
      req.app.io.emit('user_updated', user)
      res.json(user);
    });
  });
};

exports.deleteUser = (req, res, next) => {
  let user = req.profile;
  if (user._id != req.auth._id) {
    return res.status(403).json({
      error: "You can delete only your own account!"
    });
  }
  user.remove((error, user) => {
    if (error) {
      return res.status(400).json({
        error
      });
    }
    user.hashed_password = undefined;
    user.salt = undefined;
    res.json({
      user
    });
  });
};

//follow
exports.addFollowing = (req, res, next) => {
  User.findOneAndUpdate({
      _id: req.body.userId
    }, {
      $addToSet: {
        following: req.body.followId
      }
    },
    (error, result) => {
      if (error) {
        return res.status(400).json({
          error
        });
      }
      next();
    }
  );
};

exports.addFollower = (req, res) => {
  User.find({
    followers: req.body.userId,
    _id: req.body.followId
  }).exec((err, followersArr) => {
    if (followersArr.length === 0) {
      User.findOneAndUpdate({
            _id: req.body.followId
          }, {
            $addToSet: {
              followers: req.body.userId
            }
          },
          (error, result) => {
            if (error) {
              return res.status(400).json({
                error
              });
            }
          }
        )
        .populate("following", "_id name")
        .populate("followers", "_id name")
        .exec((error, result) => {
          if (error) {
            return res.status(400).json({
              error
            });
          }
          result.hashed_password = undefined;
          result.salt = undefined;
          if (result.photo) {
            result.photo.data = undefined
          }
          req.app.io.emit('user_updated', result)
          return res.json(result);
        });
    }
  });
};
exports.removeFollowing = (req, res, next) => {
  User.findOneAndUpdate({
      _id: req.body.userId
    }, {
      $pull: {
        following: req.body.followId
      }
    },
    (error, result) => {
      if (error) {
        return res.status(400).json({
          error
        });
      }
      next();
    }
  );
};

exports.removeFollower = (req, res) => {
  User.findOneAndUpdate({
      _id: req.body.followId
    }, {
      $pull: {
        followers: req.body.userId
      }
    }, {
      new: true
    })
    .populate("following", "_id name")
    .populate("followers", "_id name")
    .exec((error, result) => {
      if (error) {
        return res.status(400).json({
          error
        });
      }
      result.hashed_password = undefined;
      result.salt = undefined;
      if (result.photo) {
        result.photo.data = undefined
      }
      req.app.io.emit('user_updated', result)
      return res.json(result);
    });
};