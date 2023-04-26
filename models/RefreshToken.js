const mongoose = require('mongoose')


const refreshTokenScheme = new mongoose.Schema({
    refreshtoken:{
        type:String,
        require:true
    }
})


module.exports = mongoose.model('RefreshToken',refreshTokenScheme)