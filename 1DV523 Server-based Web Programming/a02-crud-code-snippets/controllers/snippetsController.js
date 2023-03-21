'use strict'

const Snippet = require('../configs/Models/snippetsModel')
const snippetsController = {}

/**
 * Used to list all the snippets.
 * @param {object} req - Express request object.
 * @param {object} res -  Express response object.
 * @param {object} next -  Express next middleware function
 */
snippetsController.list = async (req, res) => {
  if (req.query.error) { // Used to handle error status code.
    res.status(req.query.error)
  }

  try {
    const rows = await Snippet.find({}).lean() // List all available snippets.
    res.render('snippets/snippets', { rows })
  } catch (error) {
    req.session.flash = { type: 'danger', text: 'Something went wrong.' }
    res.status(500).render('index', { flash: req.session.flash }) // If db server is probably offline.
  }
}

/**
 * Used to read a snippet.
 * Can be read by any user.
 * @param {object} req - Express request object.
 * @param {object} res -  Express response object.
 * @param {*} next
 */
snippetsController.read = async (req, res) => {
  const snippetId = req.params.id

  try {
    const description = await Snippet.findById(snippetId).lean() // Displays all the chosen.
    res.render('snippets/read', { description })
  } catch (error) {
    req.session.flash = { type: 'danger', text: 'Snippet does not exist.' } // If something goes wrong on loading the snippet.
    res.redirect('/snippets?error=404')
  }
}

/**
 *This function is used to render the form,
 *for created a new snippet.
 * @param {object} req - Express request object.
 * @param {object} res -  Express response object.
 * @returns
 */
snippetsController.create = (req, res) => {
  if (req.session.user) { // Check if the user is signed in.
    res.render('snippets/create')
  } else {
    req.session.flash = { type: 'danger', text: 'You must login to create a snippet.' } // If not flash message with error will be displayed.
    res.redirect('/snippets?error=402')
  }
}

/**
 * Used to submit a new user form.
 * @param {object} req - Express request object.
 * @param {object} res -  Express response object.
 */
snippetsController.add = async (req, res,next) => {
  if (req.session.user) { // Check if the user is logged in.

    const date = new Date().toUTCString() // Get the current time.
    try {

      await Snippet.create({
        username: req.session.user.username, // Get the users username.
        created: date, //  Current time.
        name: req.body.snippetname, // Snippet name.
        description: req.body.description // Snippet body.
      })

      req.session.flash = { type: 'success', text: 'The snippet was successfully created.' }
      res.redirect('/snippets')
    } catch (error) {
  
      const message = Object.values(error.errors).map(val => val.message)[0] // Load mongoose error message.
      req.session.flash = { type: 'danger', text: message } // Something wrong on server side.
      res.render('snippets/create',{flash: req.session.flash})
    }
  } else {
    req.session.flash = { type: 'danger', text: 'You must login to create a snippet.' }
    res.redirect('/snippets?error=401')
    
  }
}

/**
 * Controlls first if the user is signed in,
 * then controlls if the user owns the snippet,
 * the user can then edit the snippet.
 * @param {object} req - Express request object.
 * @param {object} res -  Express response object.
 * @returns
 */
snippetsController.edit = async (req, res) => {
  // Check if user is signed in.
  if (req.session.user) {
    const snippetId = req.params.id
    let author

    try {
      author = await Snippet.findById(snippetId).lean() // Load snippet from database.
    } catch (error) {
      req.session.flash = { type: 'danger', text: 'Snippet does not exist.' } // If something goes wrong on server side.
      res.redirect('/snippets?error=404')
      return
    }
    // Check if user owns the chosen snippet.
    if (author.username === req.session.user.username) { // If user somehow manages to reach here without being author.
      res.render('snippets/edit', { author })
    } else {
      req.session.flash = { type: 'danger', text: 'You are not the author.' } // If user is not the author.
      res.redirect('/snippets?error=403')
    }
  } else {
    req.session.flash = { type: 'danger', text: 'You must login to edit your snippet.' } // If user is not signed in.
    res.redirect('/snippets?error=401')
  }
}

snippetsController.update = async (req, res) => {
  let author

  try { // Load snippet information
    const snippetId = req.params.id
    author = await Snippet.findById(snippetId).lean() // Recieve snippet from database.
  } catch (error) {
    req.session.flash = { type: 'danger', text: 'Snippet was not found.' }
    res.redirect('/snippets?error=404')
    return
  }

  // Controll that it is the correct author, for safety.
  if (author.username === req.session.user.username) {
    try {
      await Snippet.updateOne(author, { description: req.body.description }) // Update snippet on the data base.
      req.session.flash = { type: 'success', text: 'Snippet was successfully edited.' }
      res.redirect('/snippets')
    } catch (error) {
      req.session.flash = { type: 'danger', text: 'Something went wrong.' }
      res.redirect('/snippets?error=500')
    }
  } else {
    req.session.flash = { type: 'danger', text: 'You are not the author.' }
    res.redirect('/snippets?error=403')
  }
}

/**
 * Checks first if the user is signed in,
 * then checks if the user owns the snippet,
 * When done, the snippet will be deleted.
 * @param {object} req - Express request object.
 * @param {object} res -  Express response object.
 * @returns
 */
snippetsController.delete = async (req, res) => {
  // Check if user is signed in.
  if (req.session.user) {
    const snippetId = req.params.id
    let reqSnippet = ''

    try {
      reqSnippet = await Snippet.findById(snippetId) // Recieve snippet from database.
    } catch (error) {
      req.session.flash = { type: 'danger', text: 'Snippet does not exist.' }
      res.redirect('/snippets')
      return
    }
    // Check if the user owns the snippet.
    if (reqSnippet.username === req.session.user.username) {
      try {
        await Snippet.deleteOne(reqSnippet) // Delete the snippet from the database.
        req.session.flash = { type: 'success', text: 'The snippet was successfully deleted.' }
        res.redirect('/snippets')
      } catch (error) {
        req.session.flash = { type: 'danger', text: 'Something went wrong.' } // If something goes wrong on the server side.
        res.redirect('/snippets?error=500')
      }
    } else { // If the user does not own the snippet.
      req.session.flash = { type: 'danger', text: 'You are not the author.' }
      res.redirect('/snippets?error=403')
    }
  } else {
    req.session.flash = { type: 'danger', text: 'You must login to delete your snippet.' } // Message if user is not signed in.
    res.redirect('/snippets?error=401')
  }
}

module.exports = snippetsController
