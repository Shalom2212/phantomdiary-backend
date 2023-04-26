const express = require('express')
const router = express.Router()
const controllers = require('../controllers/tokenController')


router.route('/')
    .post(controllers)

module.exports = router
