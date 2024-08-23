const express = require('express');
const { createPost, getAllPost, updatePostById, getPostById, deletePost } = require('../controllers/blogController.js');
const { verifytJWT, isAdmin, isUser } = require('../middleware/auth.js');
const router = express.Router();



router.post('/posts', verifytJWT, isAdmin, createPost);
router.put('/posts/:id', verifytJWT, isAdmin, updatePostById);
router.delete('/posts/:id', verifytJWT, isAdmin, deletePost);
router.get('/posts', verifytJWT, getAllPost);
router.get('/posts/:id', verifytJWT, isUser, getPostById);



module.exports = router