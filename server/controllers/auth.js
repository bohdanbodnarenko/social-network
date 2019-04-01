const jwt = require("jsonwebtoken"),
  User = require("../models/user"),
  expressJwt = require("express-jwt");

require("dotenv").config();

exports.signup = async (req, res) => {
  const userExist = await User.findOne({
    email: req.body.email
  });
  if (userExist) return res.status(403).json(["Email is already taken!"]);
  const user = await new User(req.body);
  await user.save();
  res.json({
    message: "Signup success! Please login"
  });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;
  User.findOne(
    {
      email
    },
    (err, user) => {
      if (err || !user) {
        return res
          .status(401)
          .json(["User with that email does not exist. Please sign up!"]);
      }
      if (!user.authenticate(password)) {
        return res.status(401).json(["Email and password do not match"]);
      }
      // generate token
      const token = jwt.sign(
        {
          _id: user._id
        },
        process.env.JWT_SECRET
      );
      // User.findById(jwt.decode(token)).then(user=>console.log(user))

      res.cookie("t", token, {
        expire: new Date() + 99999
      });

      const { _id, name, email } = user;

      return res.json({
        token,
        user: {
          _id,
          email,
          name
        }
      });
    }
  );
};

exports.signout = (req, res) => {
  res.clearCookie("t");
  return res.json({
    message: "Signout success!"
  });
};

exports.requireSignin = expressJwt({
  // if the token is valid, express jwt appends the verified users id
  // in an auth key to the request object
  secret: process.env.JWT_SECRET,
  userProperty: "auth"
});
