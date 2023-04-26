const Content = require('../models/Content')
const asyncHandler = require('express-async-handler')
// const authenticateToken = require('../middleware/authenticateToken')

const getAllContent = asyncHandler(async(req,res)=>{
    // const content = await Content.find().lean()
     const content = await Content.find().sort({$natural:-1}).lean();
    // Content.find().sort({ _id: -1 }, function(err, docs){
    //     console.log(docs);
    //     res.json(docs);
    // });
    if(!content?.length){
        return res.status(400).json({message: 'No content found'})
    }
    res.json(content)
})

const createContent = asyncHandler( async(req,res)=>{
    
    //return res.json(req.usertkn.name)
    const{title,content} = req.body
    username = req.usertkn.name
    if(!title || !content  ){
        return res.status(400).json({message:'All fields are required'})
    }

    const contentObject = {username,title,content}

    const Contents = await Content.create(contentObject)

    if(Contents){
        res.status(201).json({message:"content created"})
    }else{
        res.status(400).json({message:"Invlaid content"})
    }
})


module.exports = {
    getAllContent,
    createContent
}