const mongoose = require('mongoose')

const contentSchema = new mongoose.Schema({
    date:{
        type:Date,
        default:()=> Date.now()
    },
    username:{
        type:String,
        require:true
    },
    content:{
        type:String
    }
})


module.exports = mongoose.model('Content',contentSchema)