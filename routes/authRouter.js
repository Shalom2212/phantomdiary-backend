const express = require('express')
const controllers = require('../controllers/authController')
const router = express.Router()

router.route('/')
    .post(controllers)


module.exports = router