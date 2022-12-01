const express = require("express");
const router = express.Router();
// const staffDal = require('../services/pg.staff.dal')
const staffDal = require("../services/m.staff.dal");

// This will bring in the "fs" or file structure global object no npm install required
const fs = require("fs");
// This will bring in the "events" global object no npm install required
const eventEmmitter = require("events");
// Create the class MyEmitter to define it, making sure to the first letter is upper case, this is for classes
class MyEmitter extends eventEmmitter {}
// This instantiates a new emitter object that will be needed to access the index page
const myEmitter = new MyEmitter();

// This allows routes.js to access the functions within the logEvents.js
const logEvents = require("./logEvents");

// Creating an dot addListener or dot on function, it will have name "routes", this could be anything and functions below can have different names
// to serve different purposes then there are in this case 3 parameters, event, level (ex: information, error), and a message that can be logged
myEmitter.on("status", (theStatusCode) => {
  console.log(theStatusCode);
  // once the above part of the listeners has exicuted its block
  // the logEvents function in logEvents.js will fire and the parameters here will be sent over to be processed
  logEvents(theStatusCode);
});

router.get("/", async (req, res) => {
  // const theMovies = [
  //     {first_name: 'Youn', last_name: 'Yuh-jung'},
  //     {first_name: 'Laura', last_name: 'Dern'},
  //     {first_name: 'Regina', last_name: 'King'}
  // ];
  try {
    let theMovies = await staffDal.getMovies();
    if (DEBUG) console.table(theMovies);
    res.render("staff", { theMovies });
  } catch {
    res.render("503");
  }
});

router.get("/:id", async (req, res) => {
  // const anActor = [
  //     {first_name: 'Regina', last_name: 'King'}
  // ];
  try {
    let anActor = await staffDal.getMoviesByMovieId(req.params.id); // from postgresql
    if (anActor.length === 0) res.render("no record");
    else res.render("staff", { anActor });
  } catch {
    res.render("503");
  }
});

router.get("/:id/replace", async (req, res) => {
  if (DEBUG) console.log("movie.Replace : " + req.params.id);
  res.render("moviePut.ejs", {
    genres: req.query.genres,
    title: req.query.title,
    rated: req.query.rated,
    year: req.query.year,
    id: req.params.id,
  });
});

router.get("/:id/edit", async (req, res) => {
  if (DEBUG) console.log("movie.Edit : " + req.params.id);
  res.render("moviePatch.ejs", {
    genres: req.query.genres,
    title: req.query.title,
    rated: req.query.rated,
    year: req.query.year,
    id: req.params.id,
  });
});

router.get("/:id/delete", async (req, res) => {
  if (DEBUG) console.log("movie.Delete : " + req.params.id);
  res.render("movieDelete.ejs", {
    genres: req.query.genres,
    title: req.query.title,
    rated: req.query.rated,
    year: req.query.year,
    id: req.params.id,
  });
});

router.post("/", async (req, res) => {
  if (DEBUG) console.log("movie.POST");
  try {
    await staffDal.addMoviess(
      req.body.genres,
      req.body.title,
      req.body.rated,
      req.body.year
    );
    // let message = "Post Successful";
    res.redirect("/staff/");
    // res.render("staff", { message });
    console.log("STAFF POST WORKED DT");
  } catch {
    res.statusCode = 503;
    myEmitter.emit("status", `${res.statusCode}`);
    // log this error to an error log file.
    res.render("503");
  }
});

// PUT, PATCH, and DELETE are part of HTTP, not a part of HTML
// Therefore, <form method="PUT" ...> doesn't work, but it does work for RESTful API

router.put("/:id", async (req, res) => {
  if (DEBUG) console.log("movie.PUT: " + req.params.id);
  try {
    await staffDal.putMovie(
      req.params.id,
      req.body.genres,
      req.body.title,
      req.body.rated,
      req.body.year
    );
    res.redirect("/staff/");
  } catch {
    // log this error to an error log file.
    res.render("503");
  }
});
router.patch("/:id", async (req, res) => {
  if (DEBUG) console.log("movie.PATCH: " + req.params.id);
  try {
    await staffDal.patchMovie(
      req.params.id,
      req.body.genres,
      req.body.title,
      req.body.rated,
      req.body.year
    );
    res.redirect("/staff/");
  } catch {
    // log this error to an error log file.
    res.render("503");
  }
});
router.delete("/:id", async (req, res) => {
  if (DEBUG) console.log("movie.DELETE: " + req.params.id);
  try {
    await staffDal.deleteMovie(req.params.id);
    res.redirect("/staff/");
  } catch {
    // log this error to an error log file.
    res.render("503");
  }
});

module.exports = router;
