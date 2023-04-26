require('dotenv').config()
const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const cors = require('cors')
const bodyParser = require('body-parser')
const {logger,logEvents} = require('./middleware/logger')
const erroHandler = require('./middleware/errorHandler')
const corsOptions = require('./config/corsOptions')
const connectDB = require('./config/dbConnect')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 5000

console.log(process.env.NODE_ENV)

connectDB()

app.use(logger)

app.use(cors(corsOptions))

app.use(express.json())

app.use(cookieParser())

app.use(bodyParser.urlencoded({extended:true}))

app.use('/',require('./routes/root'))

app.use('/users',require('./routes/userRoutes'))

app.use('/auth',require('./routes/authRouter'))

app.use('/content',require('./routes/contentRouters'))

app.use('/token',require('./routes/tokenRouter'))

app.use('/deltoken',require('./routes/delTokenRouter'))


app.all('*',(req,res)=>{
    res.status(404).send("404 NOT FOUND")
})

app.use(erroHandler)

mongoose.connection.once('open',()=>{
    console.log('Connected to MongoDB')
    app.listen(PORT,()=>{
        console.log(`server running on port ${PORT}`)
    })    
})

mongoose.connection.on('eroor',err => {
    console.log(err)
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,'mongoErrLog.log')
})