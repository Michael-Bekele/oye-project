const express = require("express");

// The init function is imported from our `db.js` file, as well as the routes
// we created in `routes.js`
const { init } = require("./db/db");
const routes = require("./routes/routers");

// Create a new express app
const app = express();

// Add routes
app.use(express.json());
app.use(routes);

// Initialize the database
init().then(() => {
  // Once the database is initialized, start the server by listening
  // on port 3000
  console.log(`Starting server on port ${process.env.PORT}`);
  app.listen(process.env.PORT);
});
