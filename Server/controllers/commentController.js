const asyncErrorHandler = require('../utils/asyncErrorHandler');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const CommentModal = require('../models/commentModal');
const BlogModel = require('../models/blogModel');
const UserModel = require('../models/userModel');


const createComment = asyncErrorHandler(async (req, res) => {

    const { content } = req.body
    const postId  = req.params.id
    
    if (!postId) {
        throw new ApiError(400, "Post ID is required");
    }
    if (!content) {
        throw new ApiError(400, "Content is required");
    }
    
    const user = await UserModel.findById(req.user._id).select('avatar firstname lastname')
    
    const newComment = await CommentModal.create({
        postId,
        content,
        commentBy: {
            commentedUserId: req.user._id,
            commentedUserName: `${user.firstname} ${user.lastname}`,
            commentedUserAvatar: user.avatar
        }
    })

    const createdComment = await CommentModal.findById(newComment._id)

    if (!createdComment) {
        throw new ApiError(500, "Something went wrong while creating the new comment")
    }

    await BlogModel.findByIdAndUpdate(postId, { $inc: { commentsCount: 1 } })

    return res
        .status(201)
        .json(
            new ApiResponse(200, createdComment, "Comment created successfully")
        ),

        console.log("Comment Created");

})


const getCommentByPostId = asyncErrorHandler(async (req, res) => {

    // const { postId } = req.params

    const comment = await CommentModal.find({ postId : req.params.id }).sort({ created_at: -1 })

    if (!comment) {
        throw new ApiError(404, "Comments not found")
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, comment, "Comments have been found")
        ),

        console.log("Comments found successfully")

})


const updateComment = asyncErrorHandler(async (req, res) => {

    const { content } = req.body 

    if (!content) {
        throw new ApiError(400, "Comment content is required")
    }

    const existedComment = await CommentModal.findById(req.params.commentId)

    if(!existedComment){
        throw new ApiError(404, 'Comment not found')
    }

    if(existedComment.commentBy.commentedUserId.toString() !== req.user._id.toString() ){
        throw new ApiError(403, 'You are not authorized to edit this comment')
    }

    existedComment.content = content
    const updateComment = await existedComment.save()

    if (!updatedComment) {
        throw new ApiError(404, "Updated Comment not found")
    }

    return res
        .status(200)
        .json(new ApiResponse(200, updatedComment, "Comment updated successfully"))

})



const deleteComment = asyncErrorHandler(async (req, res) => {

    const delComment = await CommentModal.findByIdAndDelete(req.params.commentId)

    if (!delComment) {
        throw new ApiError(404, "Comment not foound")
    }

    await BlogModel.findByIdAndUpdate(req.params.id, { $inc: { commentsCount: -1 } });

    return res
        .status(200)
        .json(
            new ApiResponse(200, "Comment deleted")
        ),

        console.log("Comment deleted successfully")

})


module.exports = { createComment, getCommentByPostId, updateComment, deleteComment }