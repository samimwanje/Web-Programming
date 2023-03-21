/**
 * This function is used to print the results,
 * It uses the  loaded data from cinemaDay.
 * And checks for free days from the bookings.
 */
module.exports = async function printResults (availablelDays, cinemaDay, cinemaTimes, barBody) {
  for (let i = 0; i < availablelDays.length; i++) {
    if (availablelDays[i].length > 1) {
      for (let x = 0; x < cinemaTimes.length; x++) {
        if (cinemaDay[x].toLowerCase().includes(availablelDays[i])) {
          for (let y = 0; y < barBody[i].length; y += 2) {
            if ((barBody[i][y] + barBody[i][y + 1]).includes('Free') && parseInt(barBody[i][y].replace('-', '')) > parseInt(cinemaTimes[x].replace(':', '')) + 100) {
              console.log(cinemaDay[x] + ` and there are a free tabele between ${barBody[i][y]}`) // Prints the output with the gathered information
            }
          }
        }
      }
    }
  }
  console.log()
}
