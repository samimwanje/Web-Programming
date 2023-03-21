'use strict'

const express = require('express') // Initialize express.
const router = express.Router() // Initlize express router.
const controller = require('../controllers/loginController') // Require the index controller file.

router.get('/', controller.loginForm) // Login controller get.
router.post('/', controller.loginPost) // Git login post buttom.
router.get('/logout', controller.logOut) // Logout buttons.

module.exports = router
