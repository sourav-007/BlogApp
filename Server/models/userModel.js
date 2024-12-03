const mongoose = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema(
    {
        firstname: {
            type: String,
            required: true,
            trim: true
        },
        lastname: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            minlength: [6, 'Password must be at least 6 characters long'],
            maxlength: [12, 'Password can be at most 12 characters long']
        },
        role : {
            type : String,
            enum : ['user', 'admin'],
            default : 'user'
        },
        avatar : {
            type : String
        },
        savedBlogs: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'BlogModel'
            }
        ],
        isSubscriber: {
            type: Boolean,
            default: false
        },
        resetPasswordToken: {
            type: String
        },
        resetPasswordTokenExpiries:{
            type: Date
        }
    }
)

userSchema.pre("save", async function (next){
    if(!this.isModified("password")) return next();
   
    this.password = await bcrypt.hash(this.password, 10)

    if(this.email === process.env.ADMIN_EMAIL){
        this.role = 'admin'
    }

    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken =  function(){
    return jwt.sign(
        {
            _id : this._id,
            firstname : this.firstname,
            lastname : this.lastname,
            email : this.email
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn : process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}


const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel