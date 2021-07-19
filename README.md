# Real Time Chat App

This implementation is entirely done using the following tech stack:

* [React](https://reactjs.org/)
* [NodeJS](https://nodejs.org/en/)
* [WebSocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)
* [Bootstrap](https://getbootstrap.com/)

## Source Code

The source code is divided into the following **dirs**:

1. **chat-app**: This dir contains the client-side code for the chat-application.
2. **webSocketServer**: This dir contains the server-side scripts for the chat-application.
3. **screenshots**: This dir contains the screenshots for the chat-application.

## How to Run

Please follow the below steps to run the code successfully:

**Step-0 'Clone the Repo'**: Clone the repo as follows,
```bash
git clone git@github.com:urajendi/real-time-chat-app.git
```
**NOTE:** Parent dir = _real-time-chat-app_

**Step-1 'Start the server'**: Execute the following commands (from the parent dir) to start the server,
```bash
cd webSocketServer
npm start
```
Once the server is up and running you should be seeing the following message in your terminal:
```bash
Listening on port 8000...
```
The above message will confirm that the server is running successfully!!

**Step-2 'Start the Chat App'**: Firstly, add NodeJs dependencies to this dir. Then install **websocket** with the following command:
```bash
npm i websocket
```

Execute the following commands (from the parent dir) to start the chat-app,
```bash
cd chat-app
npm start
```
Once the chat-app up and running you will be automatically taken to [http://localhost:3030/](http://localhost:3030/).

If the Port: **3030** is already being used, then use the following commands to kill the existing processes on the port:
```bash
lsof -i :3030
kill -9 *PID*
```

## Screenshots

* **Desktop Layout** for the chat-app:
* <img width="500" alt="Preview" src="https://github.com/urajendi/realtime-chat-app/blob/main/screenshots/DesktopLayoutV2.png">

* **Mobile Layout** for the chat-app:
* <img width="500" alt="Preview" src="https://github.com/urajendi/realtime-chat-app/blob/main/screenshots/MobileLayoutV2.png">
