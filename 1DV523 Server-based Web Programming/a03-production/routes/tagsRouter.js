'use strict'

const express = require('express') // Initialize express.
const router = express.Router() // Initlize express router.
const controller = require('../controllers/tagsController') // Require the index controller file.

// Router for handling a get for tags.
router.get('/', controller.tags)

router.get('/id/:id', controller.tags)

module.exports = router
