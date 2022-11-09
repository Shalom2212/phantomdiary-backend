const express = require('express')
const controllers = require('../controllers/userController')
const router = express.Router()

router.route('/')
    .get(controllers.getAllUsers)
    .post(controllers.createNewUse)


module.exports = router