'use strict'

const express = require('express') // Initialize express.
const router = express.Router() // Initlize express router.
const controller = require('../controllers/commitsController') // Require the index controller file.

// Router for handling a get from index.
router.get('/', controller.commits)

router.get('/id/:id', controller.commits)

module.exports = router
