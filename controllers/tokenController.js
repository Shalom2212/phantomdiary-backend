const RefreshToken = require('../models/RefreshToken')
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const {generateAccessToken} = require('./tokenGenerateController')


const getToken = asyncHandler(async(req,res)=>{
    const refreshToken = req.body.token
    if(refreshToken === null) return res.sendStatus(401)
    const refreshTokenDB = await RefreshToken.findOne({refreshToken}).lean().exec()
    if(!refreshTokenDB) return res.sendStatus(400)

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err,user)=>{
        if(err) return res.sendStatus(403)
        const accessToken = generateAccessToken(user.name)
        res.status(201).json({accessToken: accessToken})
    })

})


module.exports = getToken