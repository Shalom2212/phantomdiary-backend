const User = require('../models/User')
const RefreshToken = require('../models/RefreshToken')
const {generateAccessToken,generateRefreshToken} = require('./tokenGenerateController')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

const getAllUsers = asyncHandler(async(req,res) => {
    const users = await User.find().select('-password').lean()
    if(!users?.length){
        return res.status(400).json({message: 'No users found'})
    }
    res.json(users)
})

const createNewUse = asyncHandler(async(req,res)=>{
    const {username,password,email} = req.body

    if(!username || !password || !email){
        return res.status(400).json({message:'All fields are required'})
    }

    //check for duplicate

    const duplicate = await User.findOne({username}).lean().exec()

    if(duplicate){
        return res.status(409).json({message:'Duplicate username'})
    }

    const hashedpwd = await bcrypt.hash(password,10)

    const userObject = {username,"password":hashedpwd,email}

    //create user
    const user = await User.create(userObject)

    //send access token and refresh token
    const accessToken = generateAccessToken(username)
    const refreshToken = generateRefreshToken(username)

    const RefreshTokenObject = {"refreshtoken":refreshToken}
    const refreshtkn = await RefreshToken.create(RefreshTokenObject)

    if(!refreshtkn) return res.sendStatus(400)

    if(user){
        res.status(201).json({
            message:`New user ${username} created`,
            accessToken:accessToken,
            refreshToken:refreshToken
    })
    }else{
        res.status(400).json({message:'Invalid user data received'})
    }
})

//TODO:
// const updateUser = asyncHandler(async(req,res)=>{
    
// })

// const DeleteUser = asyncHandler(async(req,res)=>{ 
    
// })

module.exports = {
    getAllUsers,
    createNewUse
}