const jwt = require('jsonwebtoken')

function generateAccessToken(username){
    const tknuser = {name:username}
    return(jwt.sign(tknuser,process.env.ACCESS_TOKEN_SECRET,{expiresIn:'1800s'}))
}


function generateRefreshToken(username){
    const tknuser = {name:username}
    return(jwt.sign(tknuser,process.env.REFRESH_TOKEN_SECRET))
}


module.exports = {
    generateAccessToken,
    generateRefreshToken
}