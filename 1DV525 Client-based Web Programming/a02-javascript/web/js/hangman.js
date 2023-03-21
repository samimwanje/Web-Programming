'use strict'
import  HangmanHelp from './modules/hangmanquiz.js' // Imports .js containing the functions needed for the hang man.
const HangmanHelper = new HangmanHelp() // Creates new instance from the hangmanHelp class
const userEnter = document.querySelector('#userGuess') // Node of input from user.
const restartButton = document.querySelector('#game') // Node for the restart button.
const gameOver = document.querySelector('#gameStatus') // Node used to load the game over popup.
const gameWon = document.querySelector('#gameWon') // Node used to load the game won popup.

/**
 * Waits for the user to press enter
 * When he has chosen an input
 * Runs multiple that validates the input.
 */
userEnter.addEventListener('keyup', (event) => {
  // Add new event to
  if (event.keyCode === 13 && !HangmanHelper.userWon()) {
    // Check if user pressed enter after entering a word. Also if game have ended.
    userEnter.value = userEnter.value.replace(/\s/g, '').toLowerCase() // Gets rid of empty lines from users guess.

    if (HangmanHelper.guesses === HangmanHelper.partNames.length && userEnter.value !== '') {
      // Check if user is out of answers. Also if user guessed an empty line.
      gameOver.style.display = 'inline' // Display game over message.
    } else {
      if (userEnter.value.length === 1) {
        // Checks if only one char was entered.
        if (HangmanHelper.randWord.includes(userEnter.value)) {
          // Checks if char exist in word.
          HangmanHelper.chrToLine(userEnter.value) // Validates the char.

          if (HangmanHelper.userWon()) {
            gameWon.style.display = 'inline'
          } // A message of won game.
        } else {
          HangmanHelper.wrongGuess(userEnter) // Adds the wrong char to the collection of wrong guesses.
        }
      } else if (userEnter.value.length > 1) {
        // Checks if more than one char was entered.
        if (userEnter.value === HangmanHelper.randWord) {
          // Checks if it was the correct word.
          HangmanHelper.guessToLine(userEnter.value) // Adds the word to the line.

          gameWon.style.display = 'inline' // A message of won game.
        } else {
          HangmanHelper.displayParts(HangmanHelper.guesses) // If wrong word was entered more parts of the world is loaded.
          HangmanHelper.guesses++ // The value of guesses increases.
        }
      }

      userEnter.value = '' // Clear the text box.
    }
  }
})

/**
 *Used to refresh the page if the user wants to restart teh game.
 *Adds a listner to the node on the restart button
 */
restartButton.addEventListener('click', (event) => {
  const isButton = event.target.nodeName === 'BUTTON'
  if (!isButton) {
    return
  }

  location.reload()
})
