'use strict'
const axios = require('axios') // External module for handling req and res.

const cheerio = require('cheerio') // External module used to read an html-file.

const request = require('request') // External module used to handle GET-req simply.

const printResults = require('./printresults.js') // Used to print the gathered results.

const cinemaDay = [] // Used to store cinema output.

let barLink // Holds the logon to the bar.

const barBody = [] // Holds the days loaded from the bar.

let cookieKey // Holds the cookie.

const availablelDays = ['friday', 'saturday', 'sunday'] // Will change based on when the friends are available.

const cinemaTimes = []

const days = ['Friday', 'Saturday', 'Sunday'] // Holding the days of the week. Used to compare with available day.

const movies = [] // This array will hold the movies titles.

let currentResult = [] // Current result, hold necessery links that are needed.

const read = module.exports = async function readBody (url, command) {
  let $ // Used for the cheerio module.
  await axios.get(url).then(async res => {
    $ = cheerio.load(res.data) // Load HTML from webpage into Cheerio module.
  }).catch(err => console.error(err))

  switch (command) {
    case 'readbody' : {
      currentResult = []
      $('a').each((i, el) => {
        const link = $(el).attr('href')
        currentResult.push(link)
      })

      break
    }

    case 'readcalender': { // Read calender.
      currentResult = null
      await readCalender(url)
      break
    }

    case 'daysCalender' : { // Achieves the OK days from users calender.
      currentResult = []
      $('td').each((i, el) => {
        const link = $(el).text()
        currentResult.push(link)
      })
      break
    }

    case 'movietitles': // Collects the movie names with their options.
      currentResult = []
      $('#movie option').each((i, el) => {
        const link = $(el).text()
        movies.push(link)
      })
      break

    case 'readcinema': // Reads the cinema.
      await readCenema(url)
      break

    case 'readzakebarlink': // Calls for zak's bar page.
      await getDinner(url)
      break

    case 'readzakebar': // Recieves a cookie from bar login
      await handleCookies(url)
      break

    case 'postcookie': // Posts recieved cookie.
      await postCookie(barLink, cookieKey)
      break
  }

  return await Promise.resolve(currentResult)
}
/**
 *This function is used to acieve the calender links,
 *from different memebers, such as Peter, Mary and Paul.
 *These links are later used for scraping by calling read()
 * @param {} url - url of start page.
 * @returns - returns the avaiable days from calender.
 */
async function readCalender (url) {
  await read(url, 'readbody').then((value) => {
    for (let x = 0; x < days.length; x++) {
      const names = url + value[x].slice(2, value[x].length)
      read(names, 'daysCalender').then((value) => {
        for (let i = 0; i < 3; i++) {
          if (value[i].toLowerCase() !== 'ok') { availablelDays[i] = '' }
        }
      })
    }
  })

  return await Promise.resolve(availablelDays)
}

/**
 * This function is used to print the avaiable cinema days with,
 * movie title, day and time. It uses the the previously loaded,
 * calender.
 * @param {} startURL - Used for the starting point of cinema page.
 */
async function readCenema (startURL) {
  movies.splice(0, 1) // Removes the first element from mvoies *Pick a movie*

  // const movies = ['The Flying Deuces', 'Keep Your Seats, Please', 'A Day at the Races']

  let day // Holds the current day for a nice out print.

  const num = 5 // Value used for going through days in cinema.

  for (let i = 0; i < availablelDays.length; i++) {
    if (availablelDays[i] === days[i].toLowerCase()) {
      for (let z = 1; z < 4; z++) {
        day = '0' + (num + i)

        request(`${startURL}/check?day=${day}&movie=0${z}`, { json: true }, (error, res, body) => {
          if (!error && res.statusCode === 200) {
            for (let x = 0; x < body.length; x++) {
              if (body[x].status === 1) {
                const dayPrint = days[parseInt(body[x].day) - 5]
                const moviePrint = movies[parseInt(body[x].movie) - 1]
                cinemaTimes.push(body[x].time)
                cinemaDay.push(`On ${dayPrint} the movie "${moviePrint}" starts at ${body[x].time}`)
              }
            }
          };
        })
      }
    }
  }
}

/**
 * This function is used recieve the dinnner link.
 * @param {*} startURL Url for dinner
 */
async function getDinner (startURL) {
  await axios.get(startURL).then(async res => {
    const $ = cheerio.load(res.data) // Load HTML from webpage into Cheerio module.

    $('form').each((i, el) => {
      const link = $(el).attr('action')
      barLink = link.replace('.', '')
    })
  })
}

/**
 *This function us used to sign in for a bar booking.
 *It recieves a cookie that is later used for booking page.
 * @param {*} startURL - login url.
 */
async function handleCookies (startURL) {
  const login = { username: 'zeke', password: 'coys', submit: 'login' }

  request.post({
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    url: `${startURL}${barLink}`,
    form: login
  }, function (error, res, body) {
    if (error) { console.log(error) } else {
      cookieKey = res.headers['set-cookie'][0].split(';', 1)[0]
      barLink = (startURL + res.headers.location)
    }
  })
}

/**
 * This function is used to accsess the bookings page,
 * It uses the coookie from login and, scraps data from,
 * the bookings page.
 * @param {*} startURL -  URL FOR BOOKING
 * @param {*} cookieKey - Loaded cookie from the dinner/login
 */
async function postCookie (startURL, cookieKey) {
  await axios(`${startURL}`, {
    headers: {
      method: 'GET',
      uri: startURL,
      'content-type': 'application/x-www-form-urlencoded',
      Cookie: cookieKey
    }
  }).then(function (res) {
    const $ = cheerio.load(res.data)
    for (let x = 2; x < 7; x += 2) {
      $(`.WordSection${x}`).each((i, el) => {
        const link = $(el).text()
        const modify = link.split(/\s+/).filter((a) => a).filter(item => item !== 'booked') // Filters the bookings so they become easier to handle.
        barBody.push(modify)
      })
    }
  }).then(() => { printResults(availablelDays, cinemaDay, cinemaTimes, barBody) }) // Runs the print function.
    .catch(function (error) {
      console.log(error)
    })
}
