const mongoose = require('../db');

const blogSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        // content: {
        //     type: String,
        //     required: true
        // },
        content: {
            introduction: {
                type: String,
                required: true
            },
            body: {
                type: String,
                required: true
            },
            conclusion: {
                type: String,
                required: true
            }
        },
        coverImage: {
            type: String,
            required: true
        },
        bodyImage: [
            {
                type: String
            }
        ],
        author: {
            type: {
                authorId: {
                    type: mongoose.Schema.ObjectId,
                    ref: 'UserModal',
                    required: true
                },
                authorname: {
                    type: String,
                    required: true
                },
            },
            required: true
        },
        category: {
            type: String,
            enum: ['sports', 'health', 'business', 'tech'],
            required: true
        },
        views: {
            type: Number,
            default: 0
        },
        commentsCount: {
            type: Number,
            default: 0
        },
        tags: {
            type: [String],
            default: []
        },
        created_at: {
            type: Date,
            default: Date.now
        }
    }
)

blogSchema.index({ title: 'text', category: 'text', tags: 'text' });


const BlogModel = mongoose.model('BlogPost', blogSchema);

module.exports = BlogModel