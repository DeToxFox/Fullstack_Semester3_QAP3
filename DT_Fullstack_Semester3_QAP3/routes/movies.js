const express = require("express");
const router = express.Router();
// const actorsDal = require('../services/pg.moviess.dal')
const actorsDal = require("../services/m.movies.dal");

router.get("/", async (req, res) => {
  // const theMovies = [
  //     {first_name: 'Youn', last_name: 'Yuh-jung'},
  //     {first_name: 'Laura', last_name: 'Dern'},
  //     {first_name: 'Regina', last_name: 'King'}
  // ];
  try {
    let theMovies = await actorsDal.getMovies();
    if (DEBUG) console.table(theMovies);
    res.render("movies", { theMovies });
  } catch {
    res.render("503");
  }
});

router.get("/:id", async (req, res) => {
  // const anActor = [
  //     {first_name: 'Regina', last_name: 'King'}
  // ];
  try {
    let anActor = await actorsDal.getMoviesByMovieId(req.params.id); // from postgresql
    if (anActor.length === 0) res.render("norecord");
    else res.render("actor", { anActor });
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
  if (DEBUG) console.log("movies.POST");
  try {
    await actorsDal.addMovie(
      req.body.genres,
      req.body.title,
      req.body.rated,
      req.body.year
    );
    res.redirect("/movies/");
  } catch {
    // log this error to an error log file.
    res.render("503");
  }
});

// PUT, PATCH, and DELETE are part of HTTP, not a part of HTML
// Therefore, <form method="PUT" ...> doesn't work, but it does work for RESTful API

router.put("/:id", async (req, res) => {
  if (DEBUG) console.log("movies.PUT: " + req.params.id);
  try {
    await actorsDal.putMovie(
      req.params.id,
      req.body.genres,
      req.body.title,
      req.body.rated,
      req.body.year
    );
    res.redirect("/movies/");
  } catch {
    // log this error to an error log file.
    res.render("503");
  }
});
router.patch("/:id", async (req, res) => {
  if (DEBUG) console.log("movies.PATCH: " + req.params.id);
  try {
    await actorsDal.patchMovie(
      req.params.id,
      req.body.genres,
      req.body.title,
      req.body.rated,
      req.body.year
    );
    res.redirect("/movies/");
  } catch {
    // log this error to an error log file.
    res.render("503");
  }
});
router.delete("/:id", async (req, res) => {
  if (DEBUG) console.log("movies.DELETE: " + req.params.id);
  try {
    await actorsDal.deleteMovie(req.params.id);
    res.redirect("/movies/");
  } catch {
    // log this error to an error log file.
    res.render("503");
  }
});

module.exports = router;
