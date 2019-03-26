const jwt = require('jsonwebtoken'),
    User = require('../models/user');

require('dotenv').config();
exports.signup = async (req, res) => {
    const userExist = await User.findOne({
        email: req.body.email
    });
    if (userExist) return res.status(403).json({
        error: 'Email is already taken!'
    });
    const user = await new User(req.body);
    await user.save();
    res.json({
        message: 'Signup success! Please login.'
    });
};

exports.signin = (req, res) => {
    const {
        email,
        password
    } = req.body;
    User.findOne({
        email
    }, (err, user) => {
        if (err || !user) {
            return res.status(401).json({
                error: 'User with that email does not exist. Please sign up!'
            });
        }
        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: 'Email and password do not matchd'
            });
        }
        // generate token
        const token = jwt.sign({
            _id: user._id
        }, process.env.JWT_SECRET);

        res.cookie('t', token, {
            expire: new Date() + 99999
        });

        const {
            _id,
            name,
            email
        } = user;

        return res.json({
            token,
            user: {
                _id,
                email,
                name
            }
        })
    });
};