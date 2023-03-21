'use strict'

const express = require('express') // Initialize express.
const router = express.Router() // Initlize express router.
const controller = require('../controllers/loginController') // Require the index controller file.

router.get('/', controller.loginForm, controller.loginCookie) // Login controlls the cookie.
router.post('/', controller.loginPost)

router.get('/logout', controller.logOut)

module.exports = router
