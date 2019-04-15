const Channel = require('../models/channel'),
    {
        IncomingForm
    } = require("formidable"),
    fs = require("fs"),
    _ = require("lodash"),
    jwt = require("jsonwebtoken"),
    UserToChannel = require("../models/userToChannel"),
    io = require("socket.io");

exports.createPrivateChannel = async (req, res) => {
    // select all channels first user by him id, 
    // then select only private from them,
    // then check is second user in this channels

    let userChannels = await UserToChannel.find({
        user: req.auth._id
    })
    let privateChannels = await Channel.find({
        _id: {
            $in: userChannels.map(el => el.channel)
        },
        isPrivate: true
    })
    privateChannels = privateChannels.map(el => el._id)
    const matched = await UserToChannel.find({
        channel: {
            $in: privateChannels
        },
        user: req.body.userId
    })
    if (matched.length) {
        console.log('exists')
        res.json(matched[0].channel)
    } else {
        console.log('not exists')
        const channel = new Channel();
        channel.isPrivate = true;
        channel.participants = [req.auth._id, req.body.userId]
        channel.save(async (error, result) => {
            if (error) {
                return res.status(400).json({
                    error
                });
            }
            await new UserToChannel({
                user: req.auth._id,
                channel: result._id
            }).save()
            await new UserToChannel({
                user: req.body.userId,
                channel: result._id
            }).save()
            res.json(result._id);
        });
    }
}

exports.getChannelById = (req, res) => {
    const {
        channel
    } = req;
    if (!channel.participants.some(el => el._id.equals(req.auth._id))) {
        return res.status(403).json({
            error: 'Access denied'
        })
    }
    res.json({
        channel
    })
}

exports.channelById = (req, res, next, id) => {
    Channel.findById(id)
        .populate("participants", "_id name photo.contentType")
        .populate('messages.sender', 'name photo.contentType')
        .exec((error, channel) => {
            if (error || !channel) {
                return res.status(400).json({
                    error
                });
            }
            req.channel = channel;
            next();
        });
}

exports.addMessage = (req, res) => {
    const message = {};
    message.content = req.body.content;
    message.created = Date.now();
    message.sender = req.auth._id;
    Channel.findOneAndUpdate({
            _id: req.body.channelId
        }, {
            $push: {
                messages: message
            },
            $inc: {
                messagesCount: 1
            }
        }, {
            new: true
        })
        .populate("participants", "_id name photo.contentType")
        .populate("messages.sender", "_id name")
        .exec((error, result) => {
            if (error) {
                return res.status(400).json({
                    error
                });
            }
            // req.app.io.emit('post_updated', result)
            res.json({
                result
            });
        });
}

exports.deleteMessage = (req, res) => {
    const {
        messageId,
        channelId
    } = req.body;
    Channel.findOneAndUpdate({
            _id: channelId
        }, {
            $pull: {
                messages: {
                    _id: messageId
                }
            },
            $inc: {
                messagesCount: -1
            }
        }, {
            new: true
        })
        .populate("participants", "_id name photo.contentType")
        .populate("messages.sender", "_id name photo")
        .exec((error, result) => {
            if (error) {
                return res.status(400).json({
                    error
                });
            }
            // req.app.io.emit('post_updated', result)
            res.json({
                result
            });
        });
}

exports.channelsByUser = async (req, res) => {
    const usersChannelsId = await UserToChannel.find({
        user: req.auth._id
    })
    Channel.find({
            _id: {
                $in: usersChannelsId.map(el => el.channel)
            }
        })
        .populate("participants", "_id name photo.contentType")
        .exec((error, result) => {
            if (error) {
                return res.status(400).json({
                    error
                });
            }

            res.json(
                result
            );
        })
}