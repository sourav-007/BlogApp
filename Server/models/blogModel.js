const mongoose = require('../db');

const blogSchema = mongoose.Schema(
    {
        title : {
            type : String,
            required : true,
        },
        content : {
            type : String,
            required : true
        },
        author : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'UserModel',
            required : true
        },
        created_at : {
            type : Date,
            default : Date.now
        }
    }
)


const BlogModel = mongoose.model('BlogPost', blogSchema);

module.exports = BlogModel