const User = require("../models/user");
const _ = require("lodash"),
    jwt = require("jsonwebtoken");

exports.userById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(404).json({
                error: "User not found"
            });
        }
        req.profile = user;
        next();
    });
};

// exports.hasAuthorization = (req, res, next) => {
//     const authorized = req.profile && req.auth && req.profile._id === req.auth._id;
//     if (!authorized) {
//         return res.status(403).json({
//             error: 'User is not authorized to perform this action'
//         });
//     }
// };

exports.allUsers = (req, res) => {
    User.find((error, users) => {
        if (error) {
            return res.status(400).json({
                error
            });
        }
        res.json({
            users
        });
    }).select("_id name email updated created");
};

exports.getUser = (req, res) => {
    const {
        profile
    } = req;
    profile.hashed_password = undefined;
    profile.salt = undefined;
    res.json(profile);
};

// TODO fix it
exports.updateUser = (req, res, next) => {
    let user = req.profile;
    user = _.extend(user, req.body);
    user.updated = Date.now();
    user.save(err => {
        if (err) {
            return res.status(403).json({
                error: "You are not authorized to perform this action"
            });
        }
    });
    user.hashed_password = undefined;
    user.salt = undefined;
    res.json({
        user
    });
};

exports.deleteUser = (req, res, next) => {
    let user = req.profile;
    // const currentUser = jwt.decode(req.cookies.t);
    if (user._id !== req.auth._id) {
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