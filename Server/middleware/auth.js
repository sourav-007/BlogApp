const asyncErrorHandler = require('../utils/asyncErrorHandler');
const ApiError = require('../utils/ApiError');
const UserModel = require('../models/userModel');
const jwt = require('jsonwebtoken');


const verifyJWT = asyncErrorHandler( async (req, res, next) => {

    try {
        //console.log('Cookies:', req.cookies);
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        //console.log("token:",token);
    
        if(!token){
            throw new ApiError(401, "Unauthorized request")
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        const user = await UserModel.findById(decodedToken?._id).select("-password")
    
        if(!user){
            throw new ApiError(401, "Invalid Access Token")
        }
    
        req.user  = user
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid Access Token")
    }

} )

const isAdmin = asyncErrorHandler( async (req,res,next) => {

    if(req.user.role !== 'admin')
        throw new ApiError(403, "Unauthorized Access");
        
    next();

} )

const isUser = asyncErrorHandler( async (req,res,next) => {

    if(req.user.role !== 'user')
        throw new ApiError(403, "Unauthorized Access");
        
    next();

} )


module.exports = { verifyJWT, isAdmin, isUser }