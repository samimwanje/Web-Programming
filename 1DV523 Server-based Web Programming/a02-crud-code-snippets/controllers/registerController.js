'use strict'
const User = require('../configs/Models/userModel')
const registerController = {}

// Rendering the view of the "/register" get.
/**
 *
 * @param {object} req - Express request object.
 * @param {object} res -  Express response object.
 * @param {object} next -  Express next middleware function
 */
registerController.registerGet = (req, res, next) => {
  res.render('register')
}

// Handling a post from "/register"
/**
 * Function used to register a new user.
 * @param {object} req - Express request object.
 * @param {object} res -  Express response object.
 * @param {object} next -  Express next middleware function
 */
registerController.registerPost = async (req, res) => {
  const username = req.body.username
  const password = req.body.password

  if (password.length < 8) {
    res.status(401)
    const flash = { type: 'danger', text: 'The password is too short.' }
    res.render('register', { flash }) // Rerender the page with the view data that will be sent to the  will be sent as => {{viewData}}
  } else if (!username || (/\s/).test(username) || username.length > 20 ) {
    res.status(401)
    const flash = { type: 'danger', text: 'Username was not entered correctly.' }
    res.render('register', { flash }) // Rerender the page with the view data that will be sent to the  will be sent as => {{viewData}}
  } else if (password !== req.body.passwordConfirm) {
    const flash = { type: 'danger', text: 'Passwords do not match.' }
    res.status(401)
    res.render('register', { flash }) // Rerender the page with the view data that will be sent to the  will be sent as => {{viewData}}
  } else {
    try {
      // const password = await bcrypt.hash(req.body.password, 10)
      await User.create({
        username,
        password
      })
      res.status(200)
      // req.session.user = user
      req.session.flash = { type: 'success', text: 'Account successfully created. You can now login.' }
      const flash = req.session.flash
      res.render('register', { flash }) // Rerender the page with the view data that will be sent to the  will be sent as => {{viewData}}
    } catch (error) {
      res.status(401)
      if (error.code === 11000) {
        req.session.flash = { type: 'danger', text: 'Username does already exist.' }
        const flash = req.session.flash
        res.status(401)
        res.render('register', { flash }) // Rerender the page with the view data that will be sent to the  will be sent as => {{viewData}}
      } else {
        req.session.flash = { type: 'danger', text: error.message }
        const flash = req.session.flash
        res.status(401)
        res.render('register', { flash }) // Rerender the page with the view data that will be sent to the  will be sent as => {{viewData}}
      }
    }
  }
}

module.exports = registerController
