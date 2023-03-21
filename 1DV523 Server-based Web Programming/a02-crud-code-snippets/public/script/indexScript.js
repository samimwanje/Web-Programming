const tempNode = document.querySelector('#frontimage')

/* Used to shift between two pictures in the index page. */
tempNode.addEventListener('click', event => {
  if (tempNode.src.includes('server1.jpg') === true) {
    tempNode.src = 'img/server.jpg'
  } else {
    tempNode.src = 'img/server1.jpg'
  }
})
