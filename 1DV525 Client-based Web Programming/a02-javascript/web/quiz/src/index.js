'use strict'
import { getResponse, sendResponse } from './modules/getResponse.js' // Importing API functions.
import confetti from 'canvas-confetti'
const textBox = document.querySelector('textarea') // Console area.
let fetchUrl = '' // The source URL.
let url = '' // Variable holdning the nextURL.
let userName = '' // Username variable.
const userInput = document.querySelector('#userInput') // Used for the input from the user.

const scoreBoard = document.querySelector('#scoreboard') // Scoreboard nodes.
const topScores = ['Sami 13 seconds.', 'Gabe 10 seconds.', 'BOT 7 seconds.'] // Array used to read top socres

const body = { answer: '' } // Obeject holding the user answer.
let setupComplete = false // Flag if setup is complete.
let restart = true // Flag if user choices to play more rounds
let timePassed = 0 // Variable for time passed.

const pageTime = document.querySelector('#timer') // Node holding the timer.
let quizTime = 0 // Time spent on current question.
let answers = 0 // Used to count how many correct answers.

/**
 * This function is used to load the users on the scoreboard.
 * I just created a fake scoreboard from an array.
 * It was not possibly as I know to write to a .txt on client side.
 */
function readUsers () {
  for (let x = 0; x < topScores.length; x++) {
    const userScore = document.createElement('div')
    userScore.innerHTML = topScores[x]
    scoreBoard.appendChild(userScore)
  }
}
readUsers()
/**
 * This function is used for thte textarea output.
 *
 * @param {string} txt - The method recieves a string txt which is then printed as Console: "xyz"
 */
function updateConsole (txt) {
  textBox.innerHTML += '\n\nConosole: ' + txt
  textBox.scrollTop = textBox.scrollHeight // Auto scroll to bottom of textarea
  textBox.scrollTop = textBox.scrollHeight // Auto scroll to bottom of textarea
}

/**
 * This function outputs what the user typed.
 *
 * @param {string} txt - The function recieves the user message as txt.
 */
function userOutput (txt) {
  textBox.innerHTML += '\n\n' + userName + ': ' + txt
}

/**
 * Used to clear the console at restarts.
 */
function clearConsole () {
  textBox.innerHTML = ''
  timePassed = 0
}

var startTime // Var used to hold the timer function.

/**
 * This method has two timers. One for the current game time,
 * and one for the current question time.
 * It also stoppes the game if the question time is equal to 10.
 */
function startTimer () {
  startTime = setTimeout(function run () {
    // Has the type var because it can be accessed outside the function StartTimeer.

    timePassed++
    quizTime++
    pageTime.innerHTML = timePassed // Updates the time passed on the page.

    if (quizTime === 10) {
      // Check if user spent 10 seconds on the question.
      updateConsole('⏱️Game over, out of time.')
      restartGame()
    }
    // Timer do not start a new circle if restart command is called.
    if (!restart) {
      setTimeout(run, 1000)
    }
  }, 1000)
}

/**
 * Used to stop the timers,
 * and reset variables for next round.
 */
function stopTimers () {
  clearTimeout(startTime)
  quizTime = 0
  answers = 0
}

/**
 * This function calles the getResponse() function and uses the return to display
 * the response. It also removes unnecessary parts from the return.
 *
 * @param {*} urlReceive - Recives a fetch url to an API server, holdning the questions.
 */
function serverResponse (urlReceive) {
  getResponse(urlReceive)
    .then((data) => {
      updateConsole(data.message) // Updates console with message from API server.
      updateConsole(data.question) // Updates console with new question from API server.

      if (JSON.stringify(data.alternatives) !== undefined) {
        // Checks if it is a question with many alternatives.

        let extraText = JSON.stringify(data.alternatives)

        // Constructs a clean output.
        extraText = extraText.replace(/{|"|}/g, '')
        extraText = extraText.replace(/,/g, '\n')
        extraText = extraText.replace(/:/g, ': ')

        updateConsole('\n' + extraText + '\nAnswer "altX"')
      }

      url = data.nextURL // Changes to the upcoming POST URL.
    })
    .catch((error) => updateConsole(error))
}

/**
 * This function is used to post the users answers to the API server,
 * it also recieves an error message and displayes it if the user,
 * posted the wrong answer. It uses the sendResponse() function.
 *
 * @param {*} urlReceive - URL used to post data to API server
 * @param {*} body - Body holding the answer that will be posted.
 */
function serverPost (urlReceive, body) {
  sendResponse(urlReceive, body)
    .then((data) => {
      updateConsole(data.message)
      answers++ // Increses the answers answered.
      if (answers === 7) {
        gameWon()
        return
      } else serverResponse(data.nextURL) // Outputs that the user typed the right answer.
      quizTime = 0
    })
    .catch((e) => {
      // If something is wrong

      updateConsole('🚫Wrong answer. ' + e.message) // A message that tells the user that something is wrong.
      restartGame() // Gives the option to restart game.
    })
}

/**
 * Function used to check if correct username was entered.
 *
 * @returns {boolean} - false if username is not typed.
 */
function checkUserName () {
  if (userName === '') {
    // If user entered no username.

    textBox.innerHTML += '\n\n🚫Error, wrong username try another one...'
    userName = ''
    userInput.value = ''
    return false
  }

  return true
}

/**
 * This function is used to make sure that correct URL is entered.
 *
 * @returns {boolean} - False if the url is not an url.
 */
function checkUrl () {
  if (!fetchUrl.includes('http')) {
    // If only url is false.

    textBox.innerHTML += '\n\n🚫Error, wrong url try another one, http://...'
    userInput.value = ''
    fetchUrl = ''
    return false
  }

  return true
}

/**
 * This function is used to setup a username the first fetch url.
 *
 * @returns - returns if some of above are uncomplete.
 * The setupComplete is set to true when this function is fully done.
 */

/**
 *This function uses used on the first load,
 *It makes sure that the user enters a correct name.
 *And socket url.
 */
function setUp () {
  if (userName === '') {
    // If username is false or not entered yet.

    userName = userInput.value
    textBox.innerHTML += '\nUsername: ' + userName
    userInput.value = ''

    if (!checkUserName()) {
      // Check if usernamn is false.
      return
    } else {
      textBox.innerHTML += '\n\n✎Please enter fetch url, http://...' // Print only if username is correct.
      return
    }
  }

  if (!fetchUrl.includes('http')) {
    // If url is false, or not entered yet.

    fetchUrl = userInput.value
    textBox.innerHTML += '\nUrl: ' + fetchUrl
    userInput.value = ''

    if (!checkUrl()) return
  }

  // If both username and url are correct, we should come to this point.
  url = fetchUrl
  setupComplete = true
}

/**
 * Function used to restet game and timers.
 * Tells the user to press enter for new game.
 */
function restartGame () {
  stopTimers()
  restart = true
  updateConsole('🔄Press ENTER to start a new session.')
}

/**
 * This function is used to print winning messages
 * Also sets restart to true so the settings resets.
 */
function gameWon () {
  stopTimers()
  updateConsole('✅Congrutulations ' + userName + ', you managed to answer all the questions.')
  updateConsole('😄It took you ' + timePassed + ' seconds to answer all the questions.')
  updateConsole('📈Press ENTER if you want to play again.')
  readUsers()
  restart = true
}

// Event listner that reacts if the enter key is pressed in the text box.
userInput.addEventListener('keyup', (event) => {
  if (event.keyCode === 13) {
    // Checks if enter key is pressed.

    userInput.value = userInput.value.replace(/\s/g, '')
    // Clears the console adn the timers if the user restarted the game.
    if (restart === true && setupComplete === true) {
      clearConsole()
    }

    // Runs the setup routine until restart is set to false.
    if (restart === true) {
      // If setup is not complete.
      if (!setupComplete) {
        setUp()
      } // Run setup function.

      if (setupComplete) {
        // If the setupcomplete is set to true.
        serverResponse(fetchUrl) // Runs the serverResponse() function with the fetch url and recieves the first question.
        restart = false // Sets the restart variable to false.
        startTimer() // Stats the timer.
      }

      return // Leaves the method so user can answer on the first question by pressing ENTER.
    }

    if (setupComplete && userInput.value !== '') {
      // Everytime the user sends a message with ENTER, while the setup is complete.

      userOutput(userInput.value) // Echoes the user input.
      body.answer = userInput.value // Adds the users input to the body that is going to be fetched.
      serverPost(url, body) // Sends the body to the API server.
      userInput.value = '' // Clears the input box.
    }
  }
})

confetti.create(document.getElementById('canvas'), {
  resize: true,
  useWorker: true
})({ particleCount: 200, spread: 200 })
