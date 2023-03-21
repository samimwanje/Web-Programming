const image = document.querySelector('#frontimage')

/* Used to shift between two pictures in the index page. */
image.addEventListener('click', event => {
  if (image.src.includes('server1.jpg') === true) {
    image.src = 'img/server.jpg'
  } else {
    image.src = 'img/server1.jpg'
  }
})
