'use strict'
//const axios = require('axios')
const tagsController = {}

/**
 *Used to render the view of "/tags" get.
 * @param {object} req - Express request object.
 * @param {object} res -  Express response object.
 */
tagsController.tags = async (req, res) => {
   if (req.session.user) { // Check if the user is signed in and if there is a code.
    await renderGui(req, res) // Render requested commit page.
  }else{
    req.session.flash = { type: 'danger', text: 'You must login to view this page.' } // If not flash message with error will be displayed.
    res.redirect('/login')
  }
}

async function renderGui (req, res) {
  try {
    res.render('tags') // Render tags page.
  } catch (error) {
    req.session.flash = { type: 'danger', text: 'Something went wrong.' } // If not flash message with error will be displayed.
    res.redirect('/')
  }
}

module.exports = tagsController
