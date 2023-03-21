const socket = io() // Auto discovery of the websocket server
const notice = document.querySelector('#notice') // Table holding all issues.

prepareDom() // Read socket options.

/**
 * This loads new issues into table and
 * @param {*} data - Data from event.
 */
function loadIssue (data) {
  const table = document.querySelector('#mytable') // Table holding all issues.
  const issueLink = `https://gitlab.lnu.se/api/v4/projects/${data.object_attributes.project_id}/issues/${data.object_attributes.iid}`

  // HTML code add new isssue to table.
  table.innerHTML = '<tr style="color: black">' +
    '<th scope="row" colspan="">' +
    `<a style="display:inline-block; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 13ch; white-space: nowrap; color: white" id="footerlink" href="/hook/readissue?link=${issueLink}">${data.object_attributes.title}</a>` +
    '</th>' +
    `<th scope="row" colspan=""><a style="display:inline-block; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 16ch; white-space: nowrap;">${data.object_attributes.created_at}</a></th>` +
    `<th scope="row" colspan="">${data.user.name}</th>` +
    '<th style = "white-space: nowrap;" scope="row" colspan="">' +
    `<button type="button" style="height: 36px; font-size: 13px; color:white" class="btn btn-outline-secondary" onclick="location.href='/hook/editissue?link=${issueLink}'">Edit</button>` +
    `<button type="button" style="height: 36px; font-size: 13px;" class="btn btn-outline-danger" onclick="location.href='/hook/deleteissue?link=${issueLink}'">Del</button>` +
    '</th></tr>' + table.innerHTML

  notice.innerHTML = `New issue '${data.object_attributes.title}' created by '${data.user.name}'.` // Notify about new issue.
  notice.style.display = '' // Display new issue.

  // Remove notice after 8 seconds.
  setTimeout(() => {
    notice.style.display = 'none'
  }, 8000)
}

/**
 * This function is used create a "notice"  after updated issue event.
 * @param {*} data - Data from event.
 */
function updatedIssue (data) {
  notice.innerHTML = `Issue '${data.object_attributes.title}' has been updated by '${data.user.name}'.` // Notify about new issue.
  notice.style.display = '' // Display new issue.

  // Remove notice after 8 seconds.
  setTimeout(() => {
    notice.style.display = 'none'
  }, 8000)
}

/**
 * This function is used create a "notice" about issue comment event.
 * @param {*} data - Data from event.
 */
function commentedIssue (data) {
  notice.innerHTML = `A new comment has been added to the issue '${data.issue.title}', by '${data.user.name}'.` // Notify about new issue.
  notice.style.display = '' // Display new issue.

  // Remove notice after 8 seconds.
  setTimeout(() => {
    notice.style.display = 'none'
  }, 8000)
}

/**
 * Getting references and setting upp socket listeners
 */
function prepareDom () {
  // When we click on the switch button.
  // Displayes a loading status icon.
  socket.on('event', (body) => {
    console.log(body)
    if (projectID === (body.project.id)) { // Check if the change is for the current open project.
      if (body.object_attributes.action === 'open') { loadIssue(body) } else if (body.object_attributes.action === 'update') { updatedIssue(body) } else if (body.event_type === 'note') { commentedIssue(body) }
    }
  })
}
