'use strict'
require('dotenv').config

const loginController = {}

/**
 * Rendering the view of the "/login" from gitlab.
 * Redirects the user to gitlab login page.
 * Recieves  the token to authenticate the user.
 * @param {object} req - Express request object.
 * @param {object} res -  Express response object.
 * @param {object} next -  Express next middleware function
 */
const scope = 'read_user+api' // The prefered scopes that are needed from gitlab.
const url = 'https://gitlab.lnu.se/oauth/authorize' // Url for gitlab login page.
const redirectUrl = 'https://cscloud6-139.lnu.se/hook' // The token that authenticates the user will be sent to /hook with a request.
loginController.gitauth = (req, res, next) => { res.redirect(`${url}?client_id=${process.env.GIT_AUTH_ID}&redirect_uri=${redirectUrl}&response_type=code&scope=${scope}`) }

module.exports = loginController
