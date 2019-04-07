exports.crearePostValidator = (req, res, next) => {
  //title
  // req.check("title", "Write a title").notEmpty();
  // req.check("title", "Title must be between 4 to 150 characters").isLength({
  //   min: 4,
  //   max: 150
  // });

  // //body
  // req.check("body", "Write a body").notEmpty();
  // req.check("body", "Body must be between 4 to 2000 characters").isLength({
  //   min: 4,
  //   max: 2000
  // });

  const errors = req.validationErrors();

  if (errors) {
    const firstError = errors[0].msg;
    return res.status(400).json({
      error: firstError
    });
  }

  next();
};

exports.creareUserSignUpValidator = (req, res, next) => {
  //name
  req.check("name", "Name is required").notEmpty();

  //email
  req
    .check("email", "Email must be between 3 to 40 characters")
    .matches(/.+\@.+\../)
    .withMessage("Email is not valid")
    .isLength({
      min: 3,
      max: 40
    });

  //password
  req.check("password", "Password is required").notEmpty();
  req
    .check("password")
    .isLength({
      min: 6,
      max: 20
    })
    .withMessage("Password must be between 6 to 20 characters")
    .matches(/\d/)
    .withMessage("Password must contain a number");
  const errors = req.validationErrors();

  if (errors) {
    return res.status(400).json(errors.map(err => err.msg));
  }
  next();
};
