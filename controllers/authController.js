const User = require('../models/User')
const Content = require('../models/Content')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')


const getAuth = asyncHandler(async(req,res)=>{
    const {username,password,content} = req.body
        const crtuser = await User.findOne({username}).lean().exec()
    if(crtuser==null){
        return res.status(404).json({message:"No such user exists create new account"})
    }else{
        
            const match = await bcrypt.compare(password, crtuser.password);
        
            if(match) {

                if(!username || !content ){
                    return res.status(400).json({message:'All fields are required'})
                }
            
                const contentObject = {username,content}
            
                const Contents = await Content.create(contentObject)
            
                if(Contents){
                    res.status(201).json({message:"content created"})
                }else{
                    res.status(400).json({message:"Invlaid content"})
                }
            }
            else{
                res.status(401).json({message:"incorrect password"})
            }
    }
})

module.exports = getAuth