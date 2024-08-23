const asyncErrorHandler = require('../utils/asyncErrorHandler');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const BlogModel = require('../models/blogModel');


const createPost = asyncErrorHandler(async (req, res) => {

    const { title, content } = req.body

    if ([title, content].some((field) => field?.trim() === "")) {

        throw new ApiError(400, "All fields are required")
    }

    const posts = await BlogModel.create({
        title,
        content,
        author: req.user
    })

    const createdPosts = await BlogModel.findById(posts._id)

    if (!createdPosts) {
        throw new ApiError(500, "Something went wrong while creating the new blog post")
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, createdPosts, "Post created successfully")
        ),

        console.log("Blog Post Created");

})


const getAllPost = asyncErrorHandler(async (req, res) => {

    const blogPosts = await BlogModel.find()

    if(!blogPosts){
        throw new ApiError(404, "No blogs found")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, blogPosts, "All blogs have been found")
    ),

    console.log("Blogs found successfully")

})


const updatePostById = asyncErrorHandler(async (req, res) => {

    const { title, content } = req.body

    if (!title || !content) {
        throw new ApiError(400, "All fields are required")
    }

    const updatedPosts = await BlogModel.findByIdAndUpdate(
        req.params.id,
        {
            $set: { title, content }
        },
        { new: true }
    )

    return res
        .status(200)
        .json(new ApiResponse(200, updatedPosts, "Blog post updated successfully")),

        console.log("Blog post updated");

})


const getPostById = asyncErrorHandler(async (req, res) => {

    const blogPost = await BlogModel.findById(req.params.id)

    if (!blogPost) {
        throw new ApiError(404, "Blogs not found")
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, blogPost, "Blogs have been found")
        ),

        console.log("Blogs found successfully")

})

const deletePost = asyncErrorHandler(async (req, res) => {

    const deletedPost = await BlogModel.findByIdAndDelete(req.params.id)

    if (!deletedPost) {
        throw new ApiError(404, "No blogs found")
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, deletedPost, "Blogs deleted")
        ),

        console.log("Blogs deleted successfully")

})





module.exports = { createPost, getAllPost, updatePostById, getPostById, deletePost }