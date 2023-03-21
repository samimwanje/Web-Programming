'use strict'
const axios = require('axios')
const commitsController = {}

/**
 * Rendering the view of "/commits" get.
 * @param {object} req - Express request object.
 * @param {object} res -  Express response object.
 */
commitsController.commits = async (req, res) => {
  if (req.session.user) { // Check if the user is signed in and if there is a code.
    // Authenticate the user who tries to login.
    try {
      await renderGui(req, res) // Render requested commit page.
    } catch (error) {
      req.session.flash = { type: 'danger', text: 'Something went wrong.' }
      res.redirect('/login')
    }
  } else {
    req.session.flash = { type: 'danger', text: 'You must login to view your GitLab GUI page.' } // If not flash message with error will be displayed.
    res.redirect('/login')
  }
}

async function renderGui (req, res) {
  try {
    // Work with recieved access token.
    const token = req.session.user.token // Token used to access group api.
    const options = axios.create({ headers: { 'Content-type': 'application/json', Authorization: 'Bearer ' + token } })
    // Api calls to gitlab, responses are jsons that are used fo the web design.
    const projects = await options.get('https://gitlab.lnu.se/api/v4/groups/13213/projects', options) // Fetch data from projects catigory.
    const projectsData = projects.data // Save data from projects catigory.

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

    // Api calls for commits.
    const commitsLinks = projectLink + '/repository/commits'
    const guiIssues = await options.get(commitsLinks, options)
    const issuesData = guiIssues.data

    req.session.user.currentUrl = currentProData._links.self // Change current project to this projects url.
    const userData = req.session.user // Load user data before rerendering page.
    res.render('commits', { user: userData, projects: projectsData, issues: issuesData, currentProject: currentProData })
  } catch (error) {
    console.log(error)
    req.session.flash = { type: 'danger', text: 'Something went wrong.' } // If not flash message with error will be displayed.
    res.redirect('/')
  }
}

module.exports = commitsController
