const User = require('../models/User')
const RefreshToken = require('../models/RefreshToken')
const {generateAccessToken,generateRefreshToken} = require('./tokenGenerateController')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')


const getAuth = asyncHandler(async(req,res)=>{
    const {username,password} = req.body
        const crtuser = await User.findOne({username}).lean().exec()
    if(crtuser==null){
        return res.status(404).json({message:"No such user exists create new account"})
    }else{
        
            const match = await bcrypt.compare(password, crtuser.password);
        
            if(match) {

                if(!username){
                    return res.status(400).json({message:'All fields are required'})
                }

                const accessToken = generateAccessToken(username)
                const refreshToken = generateRefreshToken(username)
            
                const RefreshTokenObject = {"refreshtoken":refreshToken}
                const refreshtkn = await RefreshToken.create(RefreshTokenObject)
            
                if(!refreshtkn) return res.sendStatus(400)

                res.status(201).json({
                    message:`user ${username} logged in`,
                    accessToken:accessToken,
                    refreshToken:refreshToken
                })
            }
            else{
                res.status(401).json({message:"incorrect password"})
            }
    }
})

module.exports = getAuth