'use strict'
const axios = require('axios') // Easily handles get, post, put and so on with async await.
require('dotenv').config
const hookController = {}

/**
 * Used to start all the account.
 * @param {object} req - Express request object.
 * @param {object} res -  Express response object.
 * @param {object} next -  Express next middleware function
 */
hookController.createIssue = async (req, res, next) => {
  if (req.session.user) { // Controll that the user is signed in.
    try {
      const token = req.session.user.token // Token used to access group api.
      const options = axios.create({ headers: { 'Content-type': 'application/json', Authorization: 'Bearer ' + token } })
      const project = await options.get(`${req.session.user.currentUrl}`, options) // Request the project information.
      const projectData = project.data // Read current project data.
      res.render('issues/createissue', { project: projectData })
    } catch (error) {
      req.session.flash = { type: 'danger', text: 'Something went wrong.' } // If not flash message with error will be displayed.
      res.redirect('/hook')
    }
  } else {
    req.session.flash = { type: 'danger', text: 'You must login to view a issue.' } // If not flash message with error will be displayed.
    res.redirect('login')
  }
}

/**
 * Used to start all the account.
 * @param {object} req - Express request object.
 * @param {object} res -  Express response object.
 * @param {object} next -  Express next middleware function
 */
hookController.postIssue = async (req, res, next) => {
  if (req.session.user) { // Controll that the user is signed in.
    try {
      const title = req.body.title // Read the chosen title.
      const description = req.body.description // Read the description.

      const token = req.session.user.token // Token used to access group api.
      const options = axios.create({ headers: { 'Content-type': 'application/json', Authorization: 'Bearer ' + token } }) // Options for api.
      await options.post(`${req.session.user.currentUrl}/issues?title=${title}&description=${description}`, options) // Send new issue data to gitlab.

      req.session.flash = { type: 'success', text: 'Your new isssue has been created.' } // If not flash message with error will be displayed.
      res.redirect('/hook')
    } catch (error) {
      req.session.flash = { type: 'danger', text: 'Something went wrong.' } // If not flash message with error will be displayed.
      res.redirect('/hook')
    }
  } else {
    req.session.flash = { type: 'danger', text: 'You must login to view a issue.' } // If not flash message with error will be displayed.
    res.redirect('login')
  }
}

/**
 * Used to start all the account.
 * @param {object} req - Express request object.
 * @param {object} res -  Express response object.
 * @param {object} next -  Express next middleware function
 */
hookController.sendIssue = async (req, res, next) => {
  if (req.session.user) { // Controll that the user is signed in.
    try {
      const link = req.body.link
      const description = req.body.description
      const token = req.session.user.token // Token used to access group api.
      const options = axios.create({ headers: { 'Content-type': 'application/json', Authorization: 'Bearer ' + token } })
      await options.put(`${link}?description=${description}`, options)
      req.session.flash = { type: 'success', text: 'Your issue was successfully edited.' } // If not flash message with error will be displayed.
      res.redirect('/hook')
    } catch (error) {
      req.session.flash = { type: 'danger', text: 'Something went wrong.' } // If not flash message with error will be displayed.
      res.redirect('/')
    }
  } else {
    req.session.flash = { type: 'danger', text: 'You must login to view a issue.' } // If not flash message with error will be displayed.
    res.redirect('login')
  }
}

/**
 * Used to start all the account.
 * @param {object} req - Express request object.
 * @param {object} res -  Express response object.
 * @param {object} next -  Express next middleware function
 */
hookController.editIssue = async (req, res, next) => {
  if (req.session.user) { // Controll that the user is signed in.
    try {
      const link = req.query.link // Link of disered issue.
      const token = req.session.user.token // Token used to access group api.
      const options = axios.create({ headers: { 'Content-type': 'application/json', Authorization: 'Bearer ' + token } })
      const isssue = await options.get(link, options) // Get data of disered issue.
      const issueData = isssue.data // Save the data.
      res.render('issues/editissue', { issue: issueData }) // Render the data to the description page.
    } catch (error) {
      req.session.flash = { type: 'danger', text: 'Something went wrong.' } // If not flash message with error will be displayed.
      res.redirect('/hook')
    }
  } else {
    req.session.flash = { type: 'danger', text: 'You must login to view a issue.' } // If not flash message with error will be displayed.
    res.redirect('/login')
  }
}

/**
 * Used to start all the account.
 * @param {object} req - Express request object.
 * @param {object} res -  Express response object.
 * @param {object} next -  Express next middleware function
 */
hookController.deleteIssue = async (req, res, next) => {
  if (req.session.user) { // Controll that the user is signed in.
    try {
      const link = req.query.link // Link of disered issue.
      const token = req.session.user.token // Token used to access group api.
      const options = axios.create({ headers: { 'Content-type': 'application/json', Authorization: 'Bearer ' + token } })
      await options.delete(link, options) // Send delete request to gitLab.
      req.session.flash = { type: 'success', text: 'Issue deleted.' } // If not flash message with error will be displayed.
      res.redirect('/hook') // Re redirect to the /hook page.
    } catch (error) {
      req.session.flash = { type: 'danger', text: 'Something went wrong.' } // If not flash message with error will be displayed.
      res.redirect('/hook')
    }
  } else {
    req.session.flash = { type: 'danger', text: 'You must login to view a issue.' } // If not flash message with error will be displayed.
    res.redirect('/login')
  }
}

/**
 * Used to start all the account.
 * @param {object} req - Express request object.
 * @param {object} res -  Express response object.
 * @param {object} next -  Express next middleware function
 */
hookController.readIssue = async (req, res, next) => {
  if (req.session.user) { // Controll that the user is signed in.
    try {
      const link = req.query.link // Link for project issue.
      const token = req.session.user.token // Token used to access group api.
      const options = axios.create({ headers: { 'Content-type': 'application/json', Authorization: 'Bearer ' + token } })
      const isssue = await options.get(link, options) // Fetch issue data from gitLab.
      const issueData = isssue.data // Save issues data.
      const comments = await options.get(issueData._links.notes, options) // Get comments.
      const commentsData = comments.data // save comments data.

      res.render('issues/readissue', { issue: issueData, comments: commentsData })
    } catch (error) {
      req.session.flash = { type: 'danger', text: 'Something went wrong.' } // If not flash message with error will be displayed.
      res.redirect('/hook')
    }
  } else {
    req.session.flash = { type: 'danger', text: 'You must login to view a issue.' } // If not flash message with error will be displayed.
    res.redirect('login')
  }
}

async function renderGui (req, res) {
  try {
    // Work with recieved access token.
    const token = req.session.user.token // Token used to access group api.
    const options = axios.create({ headers: { 'Content-type': 'application/json', Authorization: 'Bearer ' + token } })
    // Api calls to gitlab, responses are jsons that are used fo the web design.
    const projects = await options.get('https://gitlab.lnu.se/api/v4/groups/13213/projects', options) // Fetch data from projects catigory.
    const projectsData = projects.data // Save  data from projects catigory.

    let projectLink // Hold the link of the project that will be rendered.
    // Check if user wants to view another project.
    if (req.params.id) {
      projectLink = `https://gitlab.lnu.se/api/v4/projects/${req.params.id}`
    } else if (req.session.user.currentUrl) {
      projectLink = req.session.user.currentUrl
    } else {
      projectLink = projects.data[0]._links.self
    }

    const currentPro = await options.get(`${projectLink}`, options) // Fetch the current project data.
    const currentProData = currentPro.data // Save the data for current porject.

    // Api calls for issues.
    const issuesLink = currentProData._links.issues
    const guiIssues = await options.get(issuesLink, options) // Link for issues api.
    const issuesData = guiIssues.data // Gather the issue data.
    const userData = req.session.user // Load user data before rerendering page.
    req.session.user.currentUrl = currentProData._links.self // Change current project to this projects url.
    res.render('hook', { user: userData, projects: projectsData, issues: issuesData, currentProject: currentProData })
  } catch (error) {
    req.session.flash = { type: 'danger', text: 'Something went wrong.' } // If not flash message with error will be displayed.
    res.redirect('/')
  }
}

/**
 * Used to start all the account.
 * @param {object} req - Express request object.
 * @param {object} res -  Express response object.
 * @param {object} next -  Express next middleware function
 */
hookController.hookGet = async (req, res, next) => {
  const code = req.query.code

  if (code && !req.session.user) { // Check if the user is signed in for the first tiem, and if there is a code.
    // Authenticates the user who tries to login.
    // Variables used for handshake between api and user.
    try {
      let options = {
        'Content-Type': 'application/json',
        client_id: process.env.GIT_AUTH_ID,
        client_secret: process.env.GIT_AUTH_SECRET,
        grant_type: 'authorization_code',
        code,
        redirect_uri: 'https://cscloud6-139.lnu.se/hook'
      }

      const response = await axios.post('https://gitlab.lnu.se/oauth/token', options) // Ask for handsake between user and api for group project.

      // Work with recieved access token.
      const token = response.data.access_token
      options = axios.create({ headers: { 'Content-type': 'application/json', Authorization: 'Bearer ' + token } })

      // Api calls to gitlab, responses are jsons that are used fo the web design.
      const user = await options.get('https://gitlab.lnu.se/api/v4/user', options) // Read user information.

      // Data recived from the api requests, used to render the HTML.
      const userData = user.data
      // Session settings.
      req.session.user = userData // Set current session to user information.
      req.session.user.token = token // Set session token so user can use API on GUi.

      await renderGui(req, res) // Render requested page.
    } catch (error) {
      req.session.flash = { type: 'danger', text: 'Something went wrong.' }
      res.redirect('/login')
    }
  } else if (req.session.user || (req.session.user && code)) { // If the user is already signed in.
    try {
      await renderGui(req, res) // Render requested page.
    } catch (error) {
      const flash = req.session.flash = { type: 'danger', text: error }
      res.render('hook', { flash })
    }
  } else {
    req.session.flash = { type: 'danger', text: 'You must login to view your GitLab GUI page.' } // If not flash message with error will be displayed.
    res.redirect('/login')
  }
}

module.exports = hookController
