const socket = io() // Auto discovery of the websocket server
const notice = document.querySelector('#notice') // Table holding all issues.

prepareDom() // Read socket options.

/**
 * This loads new issues into table and
 * @param {*} data - Data from event.
 */
function loadCommit (data) {
  const table = document.querySelector('#mytable') // Table holding all issues.

  // HTML code add new isssue to table.
  table.innerHTML = `<tr style="color: black" >
  <th scope="row" colspan=""> <a style=" display:inline-block; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 13ch; white-space: nowrap; color: white">${data.commits[0].title}</a> </th>
  <th scope="row" colspan=""><a style=" display:inline-block; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 16ch; white-space: nowrap;">${data.commits[0].timestamp}</a></th>
  <th scope="row" colspan="">${data.commits[0].author}</th>
  <th style = "white-space: nowrap;" scope="row" colspan=""> 
    <p>
    <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample${data.commits[0].id}"aria-expanded="false" aria-controls="collapseExample">
      Message
    </button>
    </p> 
  </th >

  <div class="collapse" id="collapseExample${data.commits[0].id}">
    <div style="margin-right: auto; margin-left: auto; color:white;" class="card card-body">
        <strong>${data.commits[0].message}</strong>
    </div>
  </div>                             
</tr>` + table.innerHTML

  notice.innerHTML = `New commit '${data.commits[0].title}' has been made by '${data.commits[0].author}'.` // Notify about new issue.
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
    // Check if the change is for the current open project.
    if ((projectID === (body.project.id))) {
      loadCommit(body)
    }
  })
}
