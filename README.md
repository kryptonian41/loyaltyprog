# Dell E-Commerce Loyalty Programme

This is a assignment project for **Dell's Intership Programme 2018**.

**Overview** - The web app is served by a backend server coded using Node.js and the frontend side of the app in implemented using Vue.js. The web app has been hosted on Heroku.

## Demo

You can view the live example [here](https://delloyalty.herokuapp.com).

## Folder Structure

**Server** - The root folder (except the client folder) contains the files for our Node.js server.

**Client** - The client folder all the files for our Vue.js SPA.

## Tech Stack Used

### Backend

1. Node.js - To set up the server
2. NoSQL Database - Firebase
3. Axios - To make API calls

### Frontend

1. Vue.js
2. Webpack

---

## Developement Setup

Start the backend node server by running the following command in the root directory.

> `$ npm install`
>
> `$ npm run dev`

Start Vue development server by running the following commands in a seperate terminal window.

> `$ cd client`
>
> `$ npm install`
>
> `$ npm run dev`

Default port configuration

- Node server - 4000
- Vue development server - 8080

Click [here](http://localhost:8080) to open the web app, the proxy is already setup so that our vue dev server can communicate with our node server.

---
