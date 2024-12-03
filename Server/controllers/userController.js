const asyncErrorHandler = require('../utils/asyncErrorHandler');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const UserModel = require('../models/userModel');
const { uploadOnCloudinary, deleteFromCloudinary, getPublicIdFromUrl } = require('../utils/cloudinary');
const nodemailer = require('nodemailer');
const { resetEmailTemplate, resetSuccessEmailTemplate, subscribeEmailTemplate, unsubscribeEmailTemplate } = require('../utils/emailTemplates')
const jwt = require('jsonwebtoken');
const BlogModel = require('../models/blogModel');



const generateToken = async (userId) => {

    try {
        const user = await UserModel.findById(userId)
        const accessToken = user.generateAccessToken()
        //console.log("userId:", userId)
        //console.log("AT : ", accessToken);

        return { accessToken }

    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating access token")
    }
}

const registerUser = asyncErrorHandler(async (req, res) => {


    // res.status(200).json({
    //     message:"all okkk "
    // })

    const { firstname, lastname, email, password } = req.body;
    //console.log("email :", email);

    console.log('Request body:', req.body);

    if ([firstname, lastname, email, password].some((field) => field?.trim() === "")) {

        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await UserModel.findOne({ email })
    console.log("Existed User :", existedUser);

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists")
    }

    const user = await UserModel.create({
        firstname,
        lastname,
        email,
        password,
    })


    const createdUser = await UserModel.findById(user._id).select("-password")

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    ),

        console.log("registered");

})

const loginUser = asyncErrorHandler(async (req, res) => {

    const { email, password } = req.body;

    if (!email) {
        throw new ApiError(400, "Email is required")
    }
    if (!password) {
        throw new ApiError(400, "Password is required")
    }

    const user = await UserModel.findOne({ email })

    if (!user) {
        throw new ApiError(404, "User does not exist")
    }

    const isPasswordVaild = await user.isPasswordCorrect(password)

    if (!isPasswordVaild) {
        throw new ApiError(404, "Invalid Password")
    }

    const { accessToken } = await generateToken(user._id)
    //console.log("AT after :", accessToken)

    const options = { httpOnly: true, secure: true }

    return res.status(200).cookie("accessToken", accessToken, options).json(
        new ApiResponse(200,
            {
                user: user, accessToken, role: user.role
            },
            "User logged In  successfully !!!"
        )
    ),

        console.log("login");


})


const logoutUser = asyncErrorHandler(async (req, res) => {

    const options = { httpOnly: true, secure: true }

    return res.status(200)
        .clearCookie("accessToken", options)
        .json(new ApiResponse(200, {}, "User logged Out Successfully")),

        console.log("logout");


})

const getCurrentUser = asyncErrorHandler(async (req, res) => {

    return res
        .status(200)
        .json(new ApiResponse(
            200,
            req.user,
            "User fetched successfully"
        ))
})

const uploadAvatar = asyncErrorHandler(async (req, res) => {

    const avatarPath = req.files?.avatar[0]?.path;

    if (!avatarPath) {
        throw new ApiError(400, "Avatar path is required")
    }

    if (req.user.avatar) {
        const publicId = getPublicIdFromUrl(req.user.avatar)
        const deleteOldAvatar = deleteFromCloudinary(publicId)

        if (!deleteOldAvatar) {
            throw new ApiError(404, "Failed to delete old avatar from Cloudinary")
        }
    }

    const avatar = await uploadOnCloudinary(avatarPath)

    if (!avatar) {
        throw new ApiError(400, "Avatar upload error")
    }

    const avatarUpload = await UserModel.findByIdAndUpdate(
        req.user._id,
        {
            $set: { avatar: avatar.url }
        },
        { new: true }
    )

    if (!avatarUpload) {
        throw new ApiError(404, "User not found and avatar not uploaded to db");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, avatarUpload, "Avatar upload successfully")),

        console.log("Avatar uploaded");

})

const updateUser = asyncErrorHandler(async (req, res) => {

    const { firstname, lastname } = req.body

    if (!firstname && !lastname) {
        throw new ApiError(400, "Atleast one field is required")
    }

    const user = await UserModel.findByIdAndUpdate(
        req.user._id,
        {
            $set: { firstname, lastname }
        },
        { new: true }
    ).select('-password')

    return res
        .status(200)
        .json(new ApiResponse(200, user, "Account details updated successfully")),

        console.log("profile details updated");

})

const forgotPassword = asyncErrorHandler(async (req, res) => {

    const { email } = req.body

    if (!email) {
        throw new ApiError(400, "Email is required")
    }

    const user = await UserModel.findOne({ email })

    if (!user) {
        throw new ApiError(404, "User with this email does not exist.")
    }

    const resetToken = jwt.sign(
        { id: user._id },
        process.env.RESET_TOKEN_SECRET,
        { expiresIn: process.env.RESET_TOKEN_EXPIRY }
    );

    user.resetPasswordToken = resetToken
    user.resetPasswordTokenExpiries = Date.now() + (5 * 60 * 1000)
    await user.save({ validateBeforeSave: false })

    const resetUrl = `${process.env.ORIGIN}/reset-password/${resetToken}`

    const transporter = nodemailer.createTransport({
        // host: 'smtp.gmail.com', 
        // port: 587,       // 465 for SSL(secure:true) & 587 for TLS(secure:false)
        // secure: false, 
        service: 'gmail',
        auth: {
            user: process.env.MAILER_EMAIL,
            pass: process.env.MAILER_EMAIL_PASSWORD
        },
    })

    const mailOptions = {
        from: process.env.MAILER_EMAIL,
        to: user.email,
        subject: '[BlogApp] Please reset your password',
        html: resetEmailTemplate(resetUrl, user.firstname)
    }

    transporter.sendMail(mailOptions, (error, response) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).json(new ApiError(500, 'Error sending email.')), console.log("Error sending email.");
        } else {
            console.log('Password reset link sent:', response);
            return res.status(200).json(new ApiResponse(200, response, 'Password reset link sent.')), console.log("Password reset link sent.");
        }
    });

})

const resetPassword = asyncErrorHandler(async (req, res) => {

    const { rToken } = req.params
    const { password, confirmPassword } = req.body

    if (!rToken) {
        throw new ApiError(404, 'Reset token not found from url')
    }

    if ([password, confirmPassword].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required")
    }

    if (password !== confirmPassword) {
        throw new ApiError(400, 'Passwords not matched with Confirm Password')
    }

    const decodedResetToken = jwt.verify(rToken, process.env.RESET_TOKEN_SECRET)

    const user = await UserModel.findById(decodedResetToken.id)

    // const user = await UserModel.findOne({
    //     resetPasswordToken: rToken,
    //     resetPasswordTokenExpiries: { $gt: Date.now() }
    // });

    if (!user) {
        throw new ApiError(401, "User not found, Invalid Reset Token")
    }
    if (user.resetPasswordTokenExpiries < Date.now() || user.resetPasswordToken === undefined) {
        user.resetPasswordToken = undefined
        user.resetPasswordTokenExpiries = undefined
        await user.save({ validateBeforeSave: false })
        return res.status(400).json(new ApiError(400, "Reset token has expired. Please request a new one."));
    }

    user.password = password;
    user.resetPasswordToken = undefined
    user.resetPasswordTokenExpiries = undefined
    await user.save({ validateBeforeSave: false })

    const transporter = nodemailer.createTransport({
        // host: 'smtp.gmail.com', 
        // port: 587,       // 465 for SSL(secure:true) & 587 for TLS(secure:false)
        // secure: false, 
        service: 'gmail',
        auth: {
            user: process.env.MAILER_EMAIL,
            pass: process.env.MAILER_EMAIL_PASSWORD
        },
    })

    const mailOptions = {
        from: process.env.MAILER_EMAIL,
        to: user.email,
        subject: '[BlogApp] Your password has been reset',
        html: resetSuccessEmailTemplate(user.firstname)
    }

    transporter.sendMail(mailOptions, (error, response) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).json(new ApiError(500, 'Error sending email.')), console.log("Error sending email.");
        } else {
            console.log('Password reset link sent:', response);
            return res.status(200).json(new ApiResponse(200, response, 'Password has been reset')), console.log("Password has been reset");
        }
    });


    // return res
    //     .status(200)
    //     .json(new ApiResponse(200, 'Password has been reset')),

    //     console.log("Password has been reset");

})


const savePost = asyncErrorHandler(async (req, res) => {

    const user = await UserModel.findById(req.user._id)

    if (!user) {
        throw new ApiError(404, 'User not found')
    }

    const post = await BlogModel.findById(req.params.blogId)

    if (!post) {
        throw new ApiError(404, 'Blog post not found')
    }

    if (user.savedBlogs.includes(req.params.blogId)) {
        throw new ApiError(400, 'This blog post is already saved')
    }

    user.savedBlogs.push(req.params.blogId)
    await user.save({ validateBeforeSave: false })

    const fullPost = await BlogModel.findById(req.params.blogId)


    return res
        .status(200)
        .json(
            new ApiResponse(200, fullPost, "Blog post saved successfully")
        ),

        console.log("Blog post saved successfully")

})


const unSavePost = asyncErrorHandler(async (req, res) => {

    const user = await UserModel.findById(req.user._id)

    if (!user) {
        throw new ApiError(404, 'User not found')
    }

    const post = await BlogModel.findById(req.params.blogId)

    if (!post) {
        throw new ApiError(404, 'Blog post not found')
    }

    if (!user.savedBlogs.includes(req.params.blogId)) {
        throw new ApiError(400, 'This blog post is not saved')
    }

    user.savedBlogs = user.savedBlogs.filter(id => id.toString() !== req.params.blogId)
    await user.save({ validateBeforeSave: false })


    return res
        .status(200)
        .json(
            new ApiResponse(200, "Blog post unsaved successfully")
        ),

        console.log("Blog post unsaved successfully")

})


const savedFavoritePost = asyncErrorHandler(async (req, res) => {

    const user = await UserModel.findById(req.user._id)

    if (!user) {
        throw new ApiError(404, 'User not found')
    }

    const favorite = await BlogModel.find({
        _id: { $in: user.savedBlogs }
    }).sort({ created_at: -1 })

    return res
        .status(200)
        .json(
            new ApiResponse(200, favorite, "Favorite post fetched successfully")
        ),

        console.log("Favorite post fetched successfully")

})

const subscribeUser = asyncErrorHandler(async (req, res) => {

    const { email } = req.body

    if (!email) {
        throw new ApiError(400, "Register email is required for subscribing")
    }

    const user = await UserModel.findOne({ _id: req.user._id, email })

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    if (user.isSubscriber) {
        throw new ApiError(400, "User is already subscribed")
    }

    user.isSubscriber = true;
    await user.save({ validateBeforeSave: false })


    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAILER_EMAIL,
            pass: process.env.MAILER_EMAIL_PASSWORD
        },
    })

    const mailOptions = {
        from: process.env.MAILER_EMAIL,
        to: email,
        subject: 'Welcome to BlogApp! We’re Glad to Have You!',
        html: subscribeEmailTemplate(user.firstname)
    }

    transporter.sendMail(mailOptions, (error, response) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).json(new ApiError(500, 'Error sending email.')), console.log("Error sending email.");
        } else {
            console.log('Subscribe mail sent:', response);
            return res.status(200).json(new ApiResponse(200, response, 'Subscription mail has been sent successfully')), console.log("Subscription mail has been sent successfully");
        }
    });


})

const unsubscribeUser = asyncErrorHandler(async (req, res) => {

    const user = await UserModel.findOne({ _id: req.user._id })

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    if (!user.isSubscriber) {
        throw new ApiError(400, "User is already unsubscribed")
    }

    user.isSubscriber = false;
    await user.save({ validateBeforeSave: false })


    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAILER_EMAIL,
            pass: process.env.MAILER_EMAIL_PASSWORD
        },
    })

    const mailOptions = {
        from: process.env.MAILER_EMAIL,
        to: user.email,
        subject: 'Sorry to See You Go! You’ve Unsubscribed from BlogApp',
        html: unsubscribeEmailTemplate(user.firstname)
    }

    transporter.sendMail(mailOptions, (error, response) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).json(new ApiError(500, 'Error sending email.')), console.log("Error sending email.");
        } else {
            console.log('Unsubscribe mail sent', response);
            return res.status(200).json(new ApiResponse(200, response, 'Unsubscribe mail has been sent successfully')), console.log("Unsubscribe mail has been sent successfully");
        }
    });

})


module.exports = {
    registerUser, loginUser, logoutUser, getCurrentUser, uploadAvatar, updateUser,
    forgotPassword, resetPassword, savePost, unSavePost, savedFavoritePost, subscribeUser, unsubscribeUser,
}