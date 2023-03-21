const createmenu = document.querySelector('#loadmenu')
const myDiv = document.createElement('div')
myDiv.innerHTML = '<ul id="menu"><li><a class="sections" href= "index.html" > Home </a></li>' +
'<li><a class="sections" href= "/report.html" > Report </a></li>' +
'<li><a class="sections" href= "./about.html" > About</a></li>' +
'<li><a style="margin-left: 5px" class="sections" href="https://coursepress.lnu.se/kurs/introduction-to-web-programming/">|&nbsp&nbspTemporary page of 1DV525</a></li></ul>'

createmenu.appendChild(myDiv)
