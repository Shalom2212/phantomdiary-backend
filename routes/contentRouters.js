const express = require('express')
const authenticateToken = require('../middleware/authenticateToken')
const controllers = require('../controllers/contentController')
const router = express.Router()

router.route('/')
    .get(controllers.getAllContent)
    .post(authenticateToken,controllers.createContent)

module.exports = router