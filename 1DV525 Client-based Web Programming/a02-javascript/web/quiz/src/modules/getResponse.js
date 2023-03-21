'use strict'
/**
 * This method is used to achieve a response from the API server.
 *
 * @param {string} url - Url used to get a response from the API server.
 * @returns {object} - Returns the response from the server, which can later be used.
 */
export async function getResponse (url) {
  const response = await fetch(url) // Start fetching with url.

  if (!response.ok) {
    // const data = await response.json()
    // console.log(response)   Error handeling
    // console.log(JSON.stringify(data, null, 4))

    throw new Error(`Error: ${response.status}`)
  }

  const data = await response.json()
  return data
}

/**
 * This function is used to post data to the API server.
 *
 * @param {string} url - Used for the URL of the API server the has a POST.
 * @param {*} body - {"answer":"xyz"} // body with the user given answer.
 * @returns {string}  - Returns a response based on how things went.
 */
export async function sendResponse (url, body) {
  const data = {
    // data object that is going to be fetched.

    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body) // Body holding the users answers.
  }

  const response = await fetch(url, data) // Start fetching with url.

  if (!response.ok) {
    const data = await response.json()
    throw JSON.parse(JSON.stringify(data, null, 4))
  }

  const recieved = await response.json()
  return recieved
}
