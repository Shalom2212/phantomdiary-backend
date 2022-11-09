const express = require('express')
const controllers = require('../controllers/contentController')
const router = express.Router()

router.route('/')
    .get(controllers.getAllContent)
    .post(controllers.createContent)

module.exports = router