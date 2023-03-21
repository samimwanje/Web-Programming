'use strict'
export default class HangmanHelp {
  constructor () {
    this.randWord = this.randomWord() // Chooses a random word from an array. ( Function)
    this.correctChars = 0 // Variable will be used to hold amount off correct chars.
    this.quizdiv = document.querySelector('#rightAnswerDiv') // Div node holding the lines of the answer.
    this.buildLines(this.randWord.length) // Runs the function to set up the lines.
    this.emptyLines = this.quizdiv.querySelectorAll('a') // Nodes containing unguessed lines.
    this.wrongAnswer = document.querySelector('#wrongGuess') // Div to hold guessed letters.
    this.guesses = 0 // Amount of guesses

    // Array containing ID's used to build the hangman-world.
    this.partNames = ['hang_hill', 'hang_construction', 'hang_body', 'hang_rightarm', 'hang_leftarm', 'hang_rightleg', 'hang_leftleg', 'hang_rope', 'hang_head']

    this.hideParts() // Hides the hangman-world from the window.
  }

  /**
   * Creates an array containing some random words
   * Chooses a random index from this array, and
   * then return this random index.
   *
   * @returns {string[]} wordArray - a random word from array.
   */
  randomWord () {
    const wordArray = ['convert', 'video', 'pile', 'exposure', 'dry', 'withdrawal', 'nerve', 'fork', 'blackmail', 'dressing', 'manufacture', 'neglect', 'silk', 'win', 'discovery', 'dynamic', 'formulate', 'close']

    return wordArray[Math.floor(Math.random() * wordArray.length)] // Creates a random number and chooses a random word using that number from array above.
  }

  /**
   * Hides the hangman world, used at the start,
   * of a new game.
   *Also enables hangman_svg so it is not seen,
   * while the page is loading.
   */
  hideParts () {
    document.querySelector('#hangman_svg').style.display = 'inline' // Used to remove the shadow effect while loading.

    for (let x = 0; x < this.partNames.length; x++) {
      // Hides the hangman-world with the help of the ID-array.
      document.getElementById(this.partNames[x]).style.display = 'none' // CSs calls to hide the hangmanworld.
    }
  }

  /**
   * This function is used to display parts of the hangman-world.
   *
   * @param {*} currentGuesses - used as an index of which part of the
   * hangman world to display.
   */
  displayParts (currentGuesses) {
    document.getElementById(this.partNames[currentGuesses]).style.display = 'inline'
  }

  /**
   * This function checks if the entered char conatins in the word.
   * If it does, it will be added to the empty lines.
   *
   * @param {*} userGuess - used to check if a single char is correct.
   */
  chrToLine (userGuess) {
    for (let x = 0; x < this.randWord.length; x++) {
      // For loop to check each char in word.
      if (this.randWord[x] === userGuess && this.emptyLines[x].innerHTML !== userGuess) {
        // Checks for the index of the chars(s).
        this.emptyLines[x].innerHTML = userGuess // Adds users char to empty line if it does exist in the questioned word.
        this.correctChars++ // For each correct entered word increase the correct word flag.
      }
    }
  }

  /**
   * This function is used collect wrong guesses from the user.
   * If the function has entered a wrong guess, it will be added to the line.
   *
   * @param {string} userEnter - used to check if a single char is correct.
   */
  wrongGuess (userEnter) {
    this.displayParts(this.guesses) // Adds a part on the hangman-world for each wrong guess.
    const newChild = document.createElement('a') // Creates an 'a' child containing the wrong char
    newChild.innerHTML = userEnter.value + ' '
    this.wrongAnswer.appendChild(newChild) // Appends the child inthe hangman game.
    this.guesses++
  }

  /**
   * This function checks if the entered word in the secret word.
   * If it is, it will be added to the empty lines.
   *
   * @param {*} userGuess - used to check if full word is correct.
   */
  guessToLine (userGuess) {
    for (let x = 0; x < this.randWord.length; x++) {
      // For loop to check each char in word.
      this.emptyLines[x].innerHTML = userGuess[x].toLowerCase() // Adds users char to empty line if it does exist in the questioned word.
    }
  }

  /**
   * This function checks if have entered all the correct chars.
   *
   * @returns {boolean} - If correct chars have been entered true will be returned.
   */
  userWon () {
    if (this.correctChars === this.randWord.length) {
      return true
    } else {
      return false
    }
  }

  /**
   * This function is used to build empty lines that will,
   *contain the guessed world.
   *
   * @param {number} length - recieves the length of the  questioned word.
   */
  buildLines (length) {
    for (let x = 0; x < length; x++) {
      const emptyLine = document.createElement('a')
      emptyLine.innerHTML = ' _ '
      this.quizdiv.appendChild(emptyLine)
    }
  }
}
