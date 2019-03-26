const express = require('express');
const {
    signup
} = require('../controllers/auth');
const {
    creareUserSignUpValidator
} = require('../validator/index');

const router = express.Router();

router.post('/signup', creareUserSignUpValidator, signup);

module.exports = router;