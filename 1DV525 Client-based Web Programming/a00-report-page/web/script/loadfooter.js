const newfooter = document.querySelector('#footerload')

const myFooter = document.createElement('div')

myFooter.innerHTML = '<footer><hr>' +
'<p>  ©2020 Sami Mwanje. <br> Contact: mm223kk@student.lnu.se <br>' +
'<a id="footerlink" href= "https://lnu.se/en/meet-linnaeus-university/Organisation/faculty-of-technology/" >' +
'</footer>'

newfooter.appendChild(myFooter)
