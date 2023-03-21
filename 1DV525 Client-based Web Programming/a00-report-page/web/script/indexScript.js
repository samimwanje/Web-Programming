const tempNode = document.querySelector('#frontimage')

/* Used to shift between two pictures in the index page. */
tempNode.addEventListener('click', event => {
  if (tempNode.src.includes('me0.jpg') === true) {
    tempNode.src = 'img/me1.jpg'
  } else {
    tempNode.src = 'img/me0.jpg'
  }
})
