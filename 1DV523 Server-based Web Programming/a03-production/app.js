'use strict'
const express = require('express') // Init express.
const hbs = require('express-hbs')
const session = require('express-session') // Model used for the session cookies.
const MemoryStore = require('memorystore')(session) // Where the session will be stored.
const path = require('path') // Used for simplier pathes.
const { join } = require('path') // Used for simplier pathes.
require('dotenv').config() // Important data is held here, on an nonaccessable file.

if (process.env.NODE_ENV === 'development') {
  var logger
  logger = require('morgan') // Logger for console.
}

const http = require('http')
// Start the app with the port.
const app = express()
const PORT = process.env.PORT || 3000

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
  store: new MemoryStore({
    checkPeriod: 86400000 // prune expired entries every 24h
  }),
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
if (process.env.NODE_ENV === 'development') { app.use(logger('dev')) }

// Parse URL-encoded bodies sent by HTML-forms.
app.use(express.urlencoded({ extended: false }))

// Values from form are recieved as json.
app.use(express.json())

// Defining the public directory of the static files. css, java etc.
const publicDirectory = path.join(__dirname, './public')
app.use(express.static(publicDirectory))

// Routers for different calls.
app.use('/', require('./routes/indexRouter'))
app.use('/login', require('./routes/loginRouter'))
app.use('/gitauth', require('./routes/gitauthRouter'))
app.use('/about', require('./routes/aboutRouter'))
app.use('/hook', require('./routes/hookRouter'))
app.use('/commits', require('./routes/commitsRouter'))
app.use('/releases', require('./routes/releasesRouter'))
app.use('/tags', require('./routes/tagsRouter'))

// Used for web hook events.
app.post('/trigger', function (req, res, next) {
  // Check if webhook is from the correct gitlab page.
  if(req.headers['x-gitlab-token'] === process.env.GIT_HOOK_SECRET){
    triggerIssue(req.body)  // Send the event body to the socket.
    res.send('Success') 
  }else{res.status(403); res.send('Forbidden') }

})

app.use('*', (req, res) => {
  // Render the error page.
  res.status(404).render('errors/404')
})


// Start the server
const server = http.createServer(app).listen(PORT, function () {
  console.log(`Express app is listening att port ${server.address().PORT}. NODE_ENV is set to ${process.env.PORT}`)
})

// Socket SETTINGS!!
// And create the websocket server

const io = require('socket.io')(server)

// This is called every time a client is conneting
// the socket is for the client that connects
io.on('connection', (socket) => {
  // When a client makes a call from switch button
  socket.on('test', async (data) => {

  })
})

/**
 * This function is used to send a triggred event to the online client.
 * @param {*} body - Body from the triggred event.
 */
function triggerIssue (body) {
  io.emit('event', body) // Send event body to clients page javascript.
}

