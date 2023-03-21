'use strict'
const aboutController = {}

/**
 *Used to render the about page.
 * @param {object} req - Express request object.
 * @param {object} res -  Express response object.
 * @param {object} next -  Express next middleware function
 */
aboutController.about = (req, res, next) => { res.render('about') }

module.exports = aboutController
