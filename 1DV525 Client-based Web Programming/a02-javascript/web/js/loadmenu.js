const createmenu = document.querySelector('#loadmenu')

const myDiv = document.createElement('div')

myDiv.innerHTML =
  '<ul id="menu">' +
  '<li><a class="sections" href= "index.html" > Home </a></li>' +
  '<li><a class="sections" href= "hangman.html" > Hangman </a></li>' +
  '<li><a style="margin-left: 5px" class="sections" href="https://coursepress.lnu.se/kurs/introduction-to-web-programming/part-2-client-side-javascript/a02-code-javascript-with-browser/">|&nbsp&nbspA02 – Code JavaScript with browser</a>' +
  '</li></ul> '

createmenu.appendChild(myDiv)
