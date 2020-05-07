# Vue Trello-Copy

## How to:
  - run npm install for the frontend and backend component in their specific folders
  - to start the server api you need to run **npm start** in the backend folder
  - to start the frontend server you need to run **npm run serve** in the trello-copy folder
  - the servers are running on localhost ports 8080 and 8081

## How it works:
  - an instance of a http server is deployed on port 8081
  - the api can connect to a mongodb atlas cloud instance to access the data tables
  - for each db table were defined get, post, put and delete endpoints
  - the vue app uses the api server to extract and use the data
  - different components manage, display and manipulate that data

## Available components:
  - Login
  - Sign up
  - Navigation Header
  - Main Menu which displays the user's current boards
  - A list with all the notes that are bound to a board
  - Each list can have zero, one or more particular notes

## Functionalities:
  - Create a new user
  - Add-Update-Remove boards
  - Add-Update-Remove lists of notes
  - Add-Update-Remove notes
  - Every component is reactive and responsive
  
## Implementation:
  - RESTful api backend server
  - single web application frontend
 
## Tehnologies and some of the used tools:
  - [Vue.js framework](https://vuejs.org/)
  - [BootstrapVue](https://bootstrap-vue.org/)
  - [Node.Js](https://nodejs.org/en/)
  - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
  - [npm](https://www.npmjs.com/)
  - [express](https://expressjs.com/)
