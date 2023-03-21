'use strict'

const express = require('express') // Init express.
const hbs = require('express-hbs')
const session = require('express-session') // Model used for the session cookies
const cookieParser = require('cookie-parser') // Used so cookie can be viewed.
const mongoose = require('./configs/mongoose')
const logger = require('morgan') // Logger for console.
const path = require('path') // Used for simplier pathes.
const { join } = require('path') // Used for simplier pathes.
require('dotenv').config() // Important data is held here, on an nonaccessable file.

// Start the app with the port.
const app = express()
const port = 5000

// Connect to the data base.
mongoose.connect().catch(error => {
  console.error(error)
  process.exit(1)
})

// View engine
app.engine('hbs', hbs.express4({
  defaultLayout: path.join(__dirname, 'views', 'layouts', 'default'),
  partialsDir: join(__dirname, 'views', 'partials') // Foooter and so on.
}))
// Set the view engine, where the 'html' files are located.
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))

// initialize express session
const sessionOptions = {
  name: 'Name of first dog', // Something secret
  secret: process.env.COOKIE_SECRET, // The super secret message, makes sure that the cookie value is hashed.
  resave: false, // Cookie will reset everytime the client connects
  saveUninitialized: false, // Create a new session if it is needed. If no session is required, no one will be created.
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24, // 1 day
    sameSite: 'lax'
  }

}
app.use(session(sessionOptions))

app.use((req, res, next) => {
// Flash message will be removed after a round trip.
  if (req.session.flash) {
    res.locals.flash = req.session.flash
    delete req.session.flash
  }

  // Handle logged in user view.
  if (req.session.user) {
    res.locals.user = req.session.user
  }

  next()
})

// Init morgan
app.use(logger('dev'))

// Parse URL-encoded bodies sent by HTML-forms.
app.use(express.urlencoded({ extended: false }))

// Values from form are recieved as json.
app.use(express.json())

// Intiliaze so cookies can be set up.
app.use(cookieParser())

// Defining the public directory of the static files. css, java etc.
const publicDirectory = path.join(__dirname, './public')
app.use(express.static(publicDirectory))

// Router handling the / calls on start page.
app.use('/', require('./routes/indexRouter'))
app.use('/snippets', require('./routes/snippetsRouter'))
app.use('/login', require('./routes/loginRouter'))
app.use('/register', require('./routes/registerRouter'))

// Error handling if user tries to access not existing page.
app.use('*', (req, res) => {
// Render the error page.
  res.status(404).render('errors/404')
})

// Start the server, and listen on defined port.
app.listen(port, () => { console.log('Server started at port ' + port) })
