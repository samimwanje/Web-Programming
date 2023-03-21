'use strict'

const express = require('express') // Initialize express.
const router = express.Router() // Initlize express router.
const controller = require('../controllers/gitauthController') // Require the index controller file.

router.get('/', controller.gitauth) // Login controlls the cookie.

module.exports = router
