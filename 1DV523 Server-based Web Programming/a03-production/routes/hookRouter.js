'use strict'
const express = require('express') // Initialize express.
const router = express.Router() // Initlize express router.
const controller = require('../controllers/hookController') // Require the index controller file.

router.post('/editissue', controller.sendIssue) // Post edit to gitLab.

router.post('/postIssue', controller.postIssue)

router.get('/', controller.hookGet) // Login controlls the cookie.

router.get('/id/:id', controller.hookGet) // Login controlls the cookie.

router.get('/readissue', controller.readIssue) // Read issue.

router.get('/editissue', controller.editIssue) // Read issue for edit.

router.get('/deleteissue', controller.deleteIssue) // Delete chosen issue.

router.get('/createissue', controller.createIssue) // Create new issue.

module.exports = router
