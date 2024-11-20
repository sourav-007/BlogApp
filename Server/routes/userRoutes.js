const express = require('express');
const { registerUser, loginUser, logoutUser, getCurrentUser, uploadAvatar, updateUser, forgotPassword, resetPassword, savePost, unSavePost, savedFavoritePost,  } = require('../controllers/userController.js');
const  { verifyJWT }  = require('../middleware/auth.js');
const upload = require('../middleware/multer.js');
const router = express.Router();


router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', verifyJWT, logoutUser);
router.get('/getuser', verifyJWT, getCurrentUser);
router.post('/avatar', verifyJWT, upload.fields([{name: "avatar", maxCount:1}]) , uploadAvatar)
router.put('/update-profile', verifyJWT, updateUser)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password/:rToken', resetPassword)
router.post('/saved-favorite/:blogId', verifyJWT, savePost)
router.delete('/unsaved-favorite/:blogId', verifyJWT, unSavePost)
router.get('/favorite', verifyJWT, savedFavoritePost)




module.exports = router