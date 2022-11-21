/**
 * Import the express module and initiate the express app
 */
const express = require("express");
const app = express();

/**
 * Set up the app to return "Okay" for any get request
 *
 * app.get() is the method to set up the app to do certain actions
 * upon a get request is sent to the app in the specified route.
 *
 * In this case we are using "*" indicating that the app should just
 * send "Okay" as a response to any get request to any route on the
 * app.
 */
app.get("*", (req, res) => {
  res.send("Okay");
});

/**
 * Set up the PORT
 *
 * app.listen() is a method to set up the app to listen to the specified
 * PORT - meaning if we go to http://localhost:8080 on our browser, this
 * app responds. Here we are setting up the app to listen to PORT 8080 and
 * once the app is running, it should log the given message on the console.
 */
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server live on port ${PORT} 🔥`);
});
