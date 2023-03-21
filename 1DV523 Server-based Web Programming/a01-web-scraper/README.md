# A01 Web scraper
In this assignment, the was to write a web scraper that scrapes and analyzes information on some web sites built especially for this assignment. The idea is that you are going to write a scraper/agent that is designed to solve a specific problem.

These were the main goals for this assignment.

Get practical experience in building a web scraper.
Get knowledge about HTTP and use it when building an application in Node.js.
Analyze the traffic between the client and the server.
Get practical knowledge of asynchronous programming in Node.js.
Analyze and solve a problem with JavaScript code.
Using Git to show progress in your work.

To run the application just type "npm start https://courselab.lnu.se/scraper-site-1" in your terminal.


**4. Describe the architecture of your application. How have you structured your code and what are your thoughts behind the architecture?**

My code begins with an index.js code which is the "main" part of the card. Here the code calls functions from the other module called "readbody". The code begins with receiving the links from the "main page", after the links has be received program goes through various SWITCH calls which are based on different cases. For example scraping the dinner page has its own SWITCH-calls and functions. In the end the "printresults.js" module runs which is used for printing the results that alla the SWITCH-calls/functions gathered.

**5. What Node concepts are essential to learn as a new programmer, when diving into Node? What would your recommendations be to a new wanna-be-Node-programmer?**

I would recommend a new Node-programmer to first learn the basics of JavaScript. After that the newbie should dive into HTTP, so he/she gets a view over how HTTP-calls work, after that the newbie-node-programmer is read to dive deeper into Node. 


**6. Are you satisfied with your application? Does it have some improvement areas? What are you especially satisfied with?**

I am pretty satisfied with my application, though I am not hundred procent sure if I handled the asynchronous calls on the right way. Though this, the code is working as expected which is the main goal. I also noticed that one requirement was using three own modules, which was the plan from the beginning, but since I got caught up in making the code with two modules I noticed that one module was using. Though I think this requirement is only important to show that we can handle and structure the code in multiple modules.

**7. What is your TIL for this course part?**

In this part for the course I learned more about why it is important to handle asynchronous code. The compiler will never wait for the code and continues to the next code. Therefore it is important to handle code that makes asynchronous calls. An example of that is reading information from another source/server. I also learned about scraping webpages which I never thought about before. This can in the future legally be used for achieving and handling information from external pages, this comes in hand with handling the achieved information.