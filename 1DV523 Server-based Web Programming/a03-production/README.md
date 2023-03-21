# A03 Production

All the needed packages can be installed using "npm install -production"

The server can be started in production mode using "npm start". This starts the server without logger and nodemon.

For the developer mode the server can be started using "npm run start:dev". This starts the server with logger and nodemon.

**Also create a .env file and add following lines if runing on new local environment:**

COOKIE_SECRET = XXXXXXXX
PORT = 5001
GIT_AUTH_ID = XXXXXXXXXXXXXXXXXXXXX
GIT_AUTH_SECRET = XXXXXXXXXXXXXXXXXXX
GIT_HOOK_SECRET = XXXXXXXXXXXXXXXXXXXX



**The server runs at https://cscloud6-139.lnu.se/ **
**The files are located in "ubuntu@mm223kk-server:/var/www/webhook" and should be ready to use.
**If not follow the instructions bellow.**

1. Install all needed packages by using: "npm install production"		**If needed.**

2. Install Process manager pm2 by using: "npm install pm2 -g"				**If needed.**

3. Start the server by using the process manager whit port and name:  "PORT=5001 pm2 start app.js --name WebhookApp:5001"

