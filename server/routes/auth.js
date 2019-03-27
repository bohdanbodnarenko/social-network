const express = require('express');
const {
    signup,
    signin,
    signout
} = require('../controllers/auth');
const {
    creareUserSignUpValidator
} = require('../validator/index');
const {
    userById
} = require('../controllers/user');

const router = express.Router();

router.post('/signup', creareUserSignUpValidator, signup);
router.post('/signin', signin);
router.get('/signout', signout);

router.param('userId', userById);

module.exports = router;