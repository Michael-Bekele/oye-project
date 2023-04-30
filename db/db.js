// import the `MongoClient` object from the library
const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();

// Define the DB name. We will call ours `myDb`
const dbName = "myDb";

// Create a singleton variable `db`
let db;

// The init function retruns a promise, which, once resolved,
// assigns the mongodb connection to the `db` variable
const init = () =>
  MongoClient.connect(process.env.DATABASE_URL, { useNewUrlParser: true }).then(
    (client) => {
      db = client.db(dbName);
    }
  );

// Take the movie as an argument and insert it into the "movies" collection
const insertMovie = (movie) => {
  const collection = db.collection("movies");
  return collection.insertOne(movie);
};

// get all movies from the "movies" collection
const getMovies = () => {
  const collection = db.collection("movies");
  return collection.find({}).toArray();
};

// take the id as an argument
const getSingleMovie = (id) => {
  const collection = db.collection("movies");
  return collection.findOne({ _id: new ObjectId(id) });
};

// take page size and page number as an argument
const getPaginated = (pageSize, pageNum) => {
  const size = parseInt(pageSize);
  const page = parseInt(pageNum);
  const collection = db.collection("movies");
  return collection
    .find({})
    .skip(size * page - size)
    .limit(size)
    .toArray();
};

// export the required functions so that we can use them elsewhere
module.exports = {
  init,
  insertMovie,
  getMovies,
  getSingleMovie,
  getPaginated,
};
