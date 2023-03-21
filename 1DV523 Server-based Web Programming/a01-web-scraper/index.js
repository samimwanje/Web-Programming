'use strict'
const startURL = process.argv.slice(2)[0] // Get the argument from npm run start...

const readBody = require('./src/readBody.js') // External module for handling the Scraping of url-body.

let currentURL = [] // Holds the urls of the pages on the site.

// Read the start page.
process.stdout.write('Scraping links...')
readBody(startURL, 'readbody').then((link) => {
  console.log('OK\n') // Notifies done Scraping start page.
  currentURL = link // Recieves the links of the urls that are on the page.

  // Read the calender.
  process.stdout.write('Scraping calender...')
  readBody(currentURL[0], 'readcalender').then(() => {
    console.log('OK\n') // Notifies done Scraping calender.

    // Scraping the Cinema
    process.stdout.write('Scraping cinema...')
    readBody(currentURL[1], 'movietitles').then(() => {
      console.log('OK\n') // Notifies done Scraping cinema.

      // Print results
      readBody(currentURL[1], 'readcinema').then(value => {
        readBody(currentURL[2], 'readzakebarlink').then(value => {
          readBody(currentURL[2], 'readzakebar').then(value => {
            console.log('Recommendations')
            console.log('===============')
            readBody(currentURL[2], 'postcookie')
          })
        })
      })
    })
  })
})
