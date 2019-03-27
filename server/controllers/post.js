const Post = require('../models/post'),
    {
        IncomingForm
    } = require('formidable'),
    fs = require('fs'),
    jwt = require('jsonwebtoken'),
    User = require('../models/user');


exports.getPosts = (req, res) => {
    const posts = Post.find()
        .populate('postedBy', '_id name ')
        .then(posts => {
            res.json({
                posts
            })
        })
        .catch(error => console.error(error));
};

exports.createPost = async (req, res, next) => {
    // let form = new IncomingForm();
    // form.keepExtensions = true;
    // form.parse(req, (error, fields, files) => {
    //     if (error) {
    //         return res.status(400).json({
    //             error: "Image could not be uploaded"
    //         });
    //     }
    let post = new Post(req.body);
    const user = await User.findById(jwt.decode(req.cookies.t));
    user.salt = undefined;
    user.hashed_password = undefined;
    post.postedBy = user;
    console.log(post)
    // if (files.photo) {
    //     post.photo.data = fs.readFileSync(files.photo.path);
    //     post.photo.contentType = files.photo.type;
    // }
    post.save((error, result) => {
        if (error) {
            return res.status(400).json({
                error
            });
        }
        res.json(result);
    });
    // });
};

exports.postsByUser = (req, res) => {
    Post.find({
            postedBy: req.profile._id
        }).populate('postedBy', '_id name')
        .sort('created')
        .exec((error, posts) => {
            if (error) {
                return res.status(400).json({
                    error
                });
            }
            res.json(posts);
        });
}