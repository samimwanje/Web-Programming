'use strict'
const loginController = {}

/**
 * Rendering the view of the "/login" get.
 * @param {object} req - Express request object.
 * @param {object} res -  Express response object.
 * @param {object} next -  Express next middleware function
 */
loginController.loginForm = (req, res, next) => {
  res.render('login') // Rerender the page with the view data that will be sent to the  will be sent as => {{viewData}}
}

/**
 *Handling a post from "/login"
 * @param {object} req - Express request object.
 * @param {object} res -  Express response object.
 * @param {object} next -  Express next middleware function
 */
loginController.loginPost = async (req, res) => {
  if (req.body.username === 'admin' && req.body.password === 'test') {
    req.session.flash = { type: 'success', text: 'Logged in successfully.' }
    req.session.user = req.body.username
    res.status(200)
    res.redirect('/hook')
  } else {
    req.session.flash = { type: 'danger', text: 'Wrong credentials.' }
    const flash = req.session.flash
    res.status(401)
    res.render('login', { flash }) // Rerender the page with the view data that will be sent to the  will be sent as => {{viewData}}
  }
}

/**
 * Used to log out the user by deleteing the cookie.
 * @param req
 * @param res
 */
loginController.logOut = (req, res) => {
  delete req.session.user // Deletes the cookie.
  req.session.flash = { type: 'success', text: 'You are now logged out.' }
  res.redirect('/login')
}

module.exports = loginController
