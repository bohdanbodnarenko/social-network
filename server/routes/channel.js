const express = require("express"),
    router = express.Router(),
    {
        requireSignin
    } = require("../controllers/auth"),
    {
        createPrivateChannel,
        getChannelById,
        channelById,
        addMessage,
        deleteMessage,
        channelsByUser
    } = require('../controllers/channel')


router.post('/channels/private', requireSignin, createPrivateChannel);
router.get('/channels/:channelId', requireSignin, getChannelById);
router.get('/channels', requireSignin, channelsByUser);
router.put('/channels/message', requireSignin, addMessage);
router.put('/channels/unmessage', requireSignin, deleteMessage);

router.param("channelId", channelById);

module.exports = router;