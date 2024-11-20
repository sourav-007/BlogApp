const { Schema } = require('mongoose');
const mongoose = require('../db');

const commentSchema = mongoose.Schema(
    {
        postId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'BlogModel',
            required: true
        },
        content: {
            type: String,
            required: true
        },
        commentBy: {
            commentedUserId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'UserModal',
                required: true
            },
            commentedUserName: {
                type: String,
                required: true
            },
            commentedUserAvatar: {
                type: String
            }
        },
        created_at: {
            type: Date,
            default: Date.now
        },
    }
)

const CommentModal = mongoose.model('Comment', commentSchema);

module.exports = CommentModal