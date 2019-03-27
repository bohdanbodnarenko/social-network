const express = require('express');
const {
    getPosts,
    createPost,
    postsByUser
} = require('../controllers/post');
const {
    requireSignin
} = require('../controllers/auth');
const {
    crearePostValidator
} = require('../validator/index');
const {
    userById
} = require('../controllers/user');



const router = express.Router();

router.get('/posts', requireSignin, getPosts);
router.get('/posts/:userId', requireSignin, postsByUser);
router.post('/posts', requireSignin, crearePostValidator, createPost);

router.param('userId', userById);

module.exports = router;