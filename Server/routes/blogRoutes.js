const express = require('express');
const { createPost, getAllPost, updatePostById, getPostById, deletePost, postSorting, postByCategory, search, getLatestPost, trendingPost } = require('../controllers/blogController.js');
const { verifyJWT, isAdmin, isUser } = require('../middleware/auth.js');
const upload = require('../middleware/multer.js');
const { createComment, getCommentByPostId, updateComment, deleteComment } = require('../controllers/commentController.js');
const router = express.Router();



router.post('/posts', verifyJWT, isAdmin,
    upload.fields([
        {
            name: "coverImage",
            maxCount: 1
        },
        {
            name: "bodyImage",
            maxCount: 3
        }
    ]), createPost);
router.put('/posts/:id', verifyJWT, isAdmin,
    upload.fields([
        {
            name: "coverImage",
            maxCount: 1
        },
        {
            name: "bodyImage",
            maxCount: 3
        }
    ]), updatePostById);
router.delete('/posts/:id', verifyJWT, isAdmin, deletePost);
router.get('/latest-posts', getLatestPost)
router.get('/trending-posts', trendingPost)
router.get('/posts', verifyJWT, getAllPost);
router.get('/posts/:id', verifyJWT, getPostById);


router.post('/posts/:id/comments', verifyJWT, isUser, createComment)
router.get('/posts/:id/comments', verifyJWT, getCommentByPostId)
router.put('/posts/:id/comments/:commentId', verifyJWT, isUser, updateComment)
router.delete('/posts/:id/comments/:commentId', verifyJWT, deleteComment)

router.post('/posts/category', verifyJWT, postByCategory)
router.post('/posts/sort', verifyJWT, postSorting)

router.get('/search', search)


module.exports = router