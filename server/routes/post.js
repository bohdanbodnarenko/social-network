const express = require('express');
const {
    getPosts,
    createPost
} = require('../controllers/post');
const {
    crearePostValidator
} = require('../validator/index');

const router = express.Router();

router.get('/', getPosts);

router.post('/post', crearePostValidator, createPost);

module.exports = router;