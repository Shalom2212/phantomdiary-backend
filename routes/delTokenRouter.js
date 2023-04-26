const express = require('express')
const router = express.Router()
const controllers = require('../controllers/delTokenController')

router.route('/')
    .post(controllers)

module.exports = router