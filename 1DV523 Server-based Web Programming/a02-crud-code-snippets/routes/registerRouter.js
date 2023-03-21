'use strict'

const express = require('express') // Initialize express.
const router = express.Router() // Initlize express router.
const controller = require('../controllers/registerController') // Require the index controller file.

// Handle the register routers in controllers.
router.get('/', controller.registerGet)
  .post('/', controller.registerPost)

module.exports = router
