// Import the express and jor library
const express = require("express");
const Joi = require("joi");
const {
  insertMovie,
  getMovies,
  getSingleMovie,
  getPaginated,
} = require("../db/db");

// Initialize a new router instance
const router = express.Router();

// Define the schema for the movie for validation of input
const movieSchema = Joi.object().keys({
  name: Joi.string(),
  year: Joi.number().integer().min(0),
});

router.post("/add-movie", (req, res) => {
  const movie = req.body;

  // The itemSchema is used to validate the fields of the item
  const result = movieSchema.validate(movie);
  if (result.error) {
    // if any of the fields are wrong, log the error and return a 400 status
    console.log(result.error);
    res.status(400).end();
    return;
  }

  // If the validation passes, insert the item into the DB
  insertMovie(movie)
    .then(() => {
      res.status(200).json("Inserted successfully");
    })
    .catch((err) => {
      // If there is any error in inserting the item, log the error and
      // return a 500 server error status
      console.log(err);
      res.status(500).json({ msg: err.msg });
    });
});

router.get("/get-all", (req, res) => {
  getMovies()
    .then((movies) => {
      // The promise resolves with the movies as results
      movie = movies.map((movie) => ({
        id: movie._id,
        name: movie.name,
        year: movie.year,
      }));
      res.json(movie);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: err.msg });
    });
});

router.get("/get-single/", (req, res) => {
  const id = req.query.id;
  console.log(id);

  getSingleMovie(id)
    .then((movie) => {
      res.json(movie);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: err.msg });
    });
});

router.get("/get-paginated/", (req, res) => {
  var size = req.query.size;
  var page = req.query.page;

  getPaginated(size, page).then((movies) => {
    movie = movies.map((movie) => ({
      id: movie._id,
      name: movie.name,
      year: movie.year,
    }));
    res.json(movie);
  });
});

module.exports = router;
