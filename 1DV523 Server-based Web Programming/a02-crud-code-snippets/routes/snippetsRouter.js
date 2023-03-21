'use strict'

const express = require('express') // Initialize express.
const router = express.Router() // Initlize express router.
const controller = require('../controllers/snippetsController') // Require the index controller file.

// get routers.
router.get('/', controller.list)
  .get('/create', controller.create)
  .get('/delete/:id', controller.delete)
  .get('/edit/:id', controller.edit)
  .get('/read/:id', controller.read)

// Post routers.
router.post('/add', controller.add)
router.post('/update/:id', controller.update)
module.exports = router
