const express = require('express');
const {
    requireSignin
} = require('../controllers/auth');
const {
    userById,
    allUsers,
    getUser,
    updateUser,
    deleteUser,
    confirmPassword
} = require('../controllers/user');

const router = express.Router();

router.get('/users', requireSignin, allUsers);
router.get('/user/:userId', requireSignin, getUser);
router.post('/user/confirm', requireSignin, confirmPassword);

router.put('/user/:userId', requireSignin, updateUser);
router.delete('/user/:userId', requireSignin, deleteUser);

router.param('userId', userById);

module.exports = router;