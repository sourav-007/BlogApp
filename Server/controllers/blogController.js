const asyncErrorHandler = require('../utils/asyncErrorHandler');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const BlogModel = require('../models/blogModel');
const { uploadOnCloudinary, deleteFromCloudinary, getPublicIdFromUrl } = require('../utils/cloudinary');


const createPost = asyncErrorHandler(async (req, res) => {

    const { title, content, category, tags } = req.body

    if ([title, category].some((field) => field?.trim() === "")) {

        throw new ApiError(400, "All fields are required")
    }

    if (!content || typeof content !== "object") {
        throw new ApiError(400, "Content must be an object with introduction, body, and conclusion fields");
    }

    // if ([content.introduction, content.body, content.conclusion].some((field) => field.trim() === "")) {
    //     throw new ApiError(400, "All content fields (introduction, body, conclusion) are required");
    // }
    if ([content.introduction, content.body, content.conclusion].some((field) => !field || field.trim() === "")) {
        throw new ApiError(400, "All content fields (introduction, body, conclusion) are required");
    }

    if (!Array.isArray(tags) || tags.length === 0) {
        throw new ApiError(400, "At least one tag is required");
    }

    //console.log("files:", req.files);

    const coverImageLocalPath = req.files?.coverImage?.[0]?.path;
    // const bodyImageLocalPath = req.files?.bodyImage[0]?.path;
    const bodyImageLocalPath = req.files?.bodyImage?.map(file => file?.path);


    if (!coverImageLocalPath) {
        throw new ApiError(400, "Cover Image file id required")
    }
    // if (!bodyImageLocalPath) {
    //     throw new ApiError(400, "Body Image file id required")
    // }

    const coverImage = await uploadOnCloudinary(coverImageLocalPath)
    // const bodyImage = await uploadOnCloudinary(bodyImageLocalPath)
    let bodyImage = [];
    if (bodyImageLocalPath && bodyImageLocalPath.length > 0) {
        bodyImage = await Promise.all(
            bodyImageLocalPath.map(path => uploadOnCloudinary(path))
        );
        if (bodyImage.some(img => !img)) {
            throw new ApiError(400, "Error uploading body images");
        }
    }

    if (!coverImage) {
        throw new ApiError(400, "Error uploading cover image")
    }
    // if (bodyImage.some(img => !img)) {
    //     throw new ApiError(400, "Error uploading body images")
    // }


    const posts = await BlogModel.create({
        title,
        content,
        coverImage: coverImage.url,
        bodyImage: bodyImage.map(img => img.url),
        category,
        tags,
        author: {
            authorId: req.user._id,
            authorname: req.user.firstname + ' ' + req.user.lastname
        }
    })

    const createdPosts = await BlogModel.findById(posts._id)

    if (!createdPosts) {
        throw new ApiError(500, "Something went wrong while creating the new blog post")
    }

    return res
        .status(201)
        .json(
            new ApiResponse(200, createdPosts, "Post created successfully")
        ),

        console.log("Blog Post Created");

})


const getAllPost = asyncErrorHandler(async (req, res) => {

    const { page = 1, limit = 9 } = req.query

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    const blogPosts = await BlogModel.find().sort({ created_at: -1 }).skip((pageNumber - 1) * limitNumber).limit(limitNumber)

    if (!blogPosts) {
        throw new ApiError(404, "No blogs found")
    }

    const totalPosts = await BlogModel.countDocuments()

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {
                    totalPosts,
                    totalPages: Math.ceil(totalPosts / limitNumber),
                    currentPage: pageNumber,
                    blogPosts
                },
                "All blogs have been found"
            )
        ),

        console.log("Blogs found successfully")

})



// const updatePostById = asyncErrorHandler(async (req, res) => {
//     console.log('enterd backend');


//     const { title, content, tags } = req.body

//     if (!title && !content?.introduction && !content?.body && !content?.conclusion && !tags && !req.files?.coverImage && !req.files?.bodyImage) {
//         throw new ApiError(400, "At least one field is required")
//     }

//     const existingPost = await BlogModel.findById(req.params.id);
//     if (!existingPost) {
//         throw new ApiError(404, "Post not found");
//     }

//     const updates = {};

//     if (title?.trim()) updates.title = title.trim();
//     //if (content?.trim()) updates.content = content.trim();
//     if (content) {
//         updates.content = updates.content || {}; // Initialize content if not already

//         if (content.introduction?.trim()) updates.content.introduction = content.introduction.trim();
//         if (content.body?.trim()) updates.content.body = content.body.trim();
//         if (content.conclusion?.trim()) updates.content.conclusion = content.conclusion.trim();
//     }
//     if (tags && Array.isArray(tags)) updates.tags = tags;

//     if (req.files?.coverImage) {
//         console.log('entered');

//         await deleteFromCloudinary(getPublicIdFromUrl(existingPost.coverImage));

//         const coverImageLocalPath = req.files.coverImage[0]?.path;
//         coverImage = await uploadOnCloudinary(coverImageLocalPath);
//         if (!coverImage) {
//             throw new ApiError(400, "Error uploading cover image");
//         }
//         updates.coverImage = coverImage.url;
//     }

//     if (req.files?.bodyImage) {

//         const existingBodyImages = existingPost.bodyImage;
//         await Promise.all(existingBodyImages.map(img => deleteFromCloudinary(getPublicIdFromUrl(img))));

//         const bodyImageLocalPaths = req.files.bodyImage.map(file => file.path);
//         bodyImage = await Promise.all(bodyImageLocalPaths.map(path => uploadOnCloudinary(path)));
//         if (bodyImage.some(img => !img)) {
//             throw new ApiError(400, "Error uploading body images");
//         }
//         updates.bodyImage = bodyImage.map(img => img.url);
//     }

//     if (Object.keys(updates).length === 0) {
//         throw new ApiError(400, "No fields provided to update");
//     }


//     const updatedPosts = await BlogModel.findByIdAndUpdate(
//         req.params?.id,
//         updates,
//         { new: true }
//     )

//     return res
//         .status(200)
//         .json(new ApiResponse(200, updatedPosts, "Blog post updated successfully")),

//         console.log("Blog post updated");

// })

const updatePostById = asyncErrorHandler(async (req, res) => {
    console.log('entered backend');

    const { title, content, tags } = req.body;

    if (!title && !content?.introduction && !content?.body && !content?.conclusion && !tags && !req.files?.coverImage && !req.files?.bodyImage) {
        throw new ApiError(400, "At least one field is required");
    }

    const existingPost = await BlogModel.findById(req.params.id);
    if (!existingPost) {
        throw new ApiError(404, "Post not found");
    }

    const updates = {};

    if (title?.trim()) updates.title = title.trim();

    if (content) {
        updates.content = { ...existingPost.content };

        if (content.introduction?.trim()) updates.content.introduction = content.introduction.trim();
        if (content.body?.trim()) updates.content.body = content.body.trim();
        if (content.conclusion?.trim()) updates.content.conclusion = content.conclusion.trim();
    }

    if (tags && Array.isArray(tags)) updates.tags = tags;

    if (req.files?.coverImage) {
        console.log('entered cover image upload');
        await deleteFromCloudinary(getPublicIdFromUrl(existingPost?.coverImage));

        const coverImageLocalPath = req.files.coverImage[0]?.path;
        const coverImage = await uploadOnCloudinary(coverImageLocalPath);
        if (!coverImage) {
            throw new ApiError(400, "Error uploading cover image");
        }
        updates.coverImage = coverImage.url;
    }

    if (req.files?.bodyImage) {
        console.log('entered body image upload');
        const existingBodyImages = existingPost?.bodyImage;
        await Promise.all(existingBodyImages.map(img => deleteFromCloudinary(getPublicIdFromUrl(img))));

        const bodyImageLocalPaths = req.files.bodyImage.map(file => file.path);
        const bodyImage = await Promise.all(bodyImageLocalPaths.map(path => uploadOnCloudinary(path)));
        if (bodyImage.some(img => !img)) {
            throw new ApiError(400, "Error uploading body images");
        }
        updates.bodyImage = bodyImage.map(img => img.url);
    }

    if (Object.keys(updates).length === 0) {
        throw new ApiError(400, "No fields provided to update");
    }

    const updatedPost = await BlogModel.findByIdAndUpdate(
        req.params.id,
        updates,
        { new: true }
    );

    console.log("Blog post updated");
    return res.status(200).json(new ApiResponse(200, updatedPost, "Blog post updated successfully"));
});



const getPostById = asyncErrorHandler(async (req, res) => {

    // const blogPost = await BlogModel.findById(req.params.id)

    const blogPost = await BlogModel.findByIdAndUpdate(
        req.params.id,
        {
            $inc: {
                views: 1
            }
        },
        {
            new: true
        }
    )

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

const getLatestPost = asyncErrorHandler(async (req, res) => {

    const latestPosts = await BlogModel.find().sort({ created_at: -1 }).limit(5)

    if (!latestPosts || latestPosts.length === 0) {
        throw new ApiError(404, 'No blogs found')
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, latestPosts, 'Latest 5 blogs have been found')
        ),

        console.log('Latest 5 blogs have been found successfully');

})

const trendingPost = asyncErrorHandler(async (req, res) => {

    const now = new Date()
    const oneMonthAgo = new Date(now.setMonth(now.getMonth() - 2));

    const trendingPost = await BlogModel.find({
        created_at: { $gte: oneMonthAgo },
    }).sort({ views: -1 }).limit(1);

    if (!trendingPost || trendingPost.length === 0) {
        throw new ApiError(404, 'No trending post found for the last month');
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, trendingPost, "Trending post found successfully")
        ),

        console.log('Trending post found successfully');

})


const postByCategory = asyncErrorHandler(async (req, res) => {

    const { category } = req.body
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 9

    const categoryPost = await BlogModel.find({ category }).sort({ created_at: -1 }).skip((page - 1) * limit).limit(limit)

    const totalPosts = await BlogModel.countDocuments({ category });

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {
                    totalPosts,
                    totalPages: (totalPosts / limit),
                    categoryPost,
                },
                "filtered"
            )
        ),

        console.log("Blogs are filtered")


})

const postSorting = asyncErrorHandler(async (req, res) => {

    const { timePeriod, mostViews, category } = req.body

    if ((timePeriod && mostViews) || (!timePeriod && !mostViews && !category)) {
        throw new ApiError(400, " Provide only one either timePeriod or mostViews")
    }

    const filter = {};
    const now = new Date();

    if (timePeriod === 'Last hour') {
        filter.created_at = { $gte: new Date(now - 60 * 60 * 1000) };
    } else if (timePeriod === 'Last day') {
        filter.created_at = { $gte: new Date(now - 24 * 60 * 60 * 1000) };
    } else if (timePeriod === 'Last week') {
        filter.created_at = { $gte: new Date(now - 7 * 24 * 60 * 60 * 1000) };
    } else if (timePeriod === 'Last month') {
        filter.created_at = { $gte: new Date(now - 30 * 24 * 60 * 60 * 1000) };
    }


    if (category) {
        filter.category = category;
    }


    const sortOrder = mostViews ? { views: -1 } : { created_at: -1 }

    const sortedPosts = await BlogModel.find(filter).sort(sortOrder)

    return res
        .status(200)
        .json(
            new ApiResponse(200, sortedPosts, "Sorted")
        ),

        console.log("Blogs are sorted")

})


const search = asyncErrorHandler(async (req, res) => {

    const { query } = req.query

    const searchedBlog = await BlogModel.find({

        $or: [
            { $text: { $search: query } },
            //{ category: { $regex: query, $options: 'i' } }
        ]

    }).sort({ score: { $meta: "textScore" } }).exec()

    if (searchedBlog.length === 0) {
        searchedBlog = await BlogModel.find({

            $or: [
                {
                    title: { $regex: query, $options: 'i' }
                },
                {
                    category: { $regex: query, $options: 'i' }
                },
                {
                    tags: { $regex: query, $options: 'i' }
                }
            ]

        }).exec()
    }


    return res
        .status(200)
        .json(
            new ApiResponse(200, searchedBlog, "Search successful")
        )


})




module.exports = { createPost, getAllPost, updatePostById, getPostById, deletePost, getLatestPost, trendingPost, postByCategory, postSorting, search }