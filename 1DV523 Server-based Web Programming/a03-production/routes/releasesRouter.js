'use strict'

const express = require('express') // Initialize express.
const router = express.Router() // Initlize express router.
const controller = require('../controllers/releasesController') // Require the index controller file.

// Router for handling a get for releases.
router.get('/', controller.releases)

module.exports = router
