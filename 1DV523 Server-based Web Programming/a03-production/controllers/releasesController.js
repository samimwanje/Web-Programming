'use strict'
const releasesController = {}
// const { promisify } = require('util')

// Rendering the view of "/releases" get.
/**
 *Used to render the start page.
 * @param {object} req - Express request object.
 * @param {object} res -  Express response object.
 * @param {object} next -  Express next middleware function
 */
releasesController.releases = (req, res, next) => {
  if (req.session.user) { res.render('releases') } // Tries to render issue.
  else {
    req.session.flash = { type: 'danger', text: 'You must login to view this page.' } // Error message without login.
    res.redirect('/login')
  }
}

module.exports = releasesController
