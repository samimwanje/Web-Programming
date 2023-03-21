'use strict'

const express = require('express') // Initialize express.
const router = express.Router() // Initlize express router.
const controller = require('../controllers/aboutController') // Require the index controller file.

// Router for handling a get from index.
router.get('/', controller.about)

module.exports = router
