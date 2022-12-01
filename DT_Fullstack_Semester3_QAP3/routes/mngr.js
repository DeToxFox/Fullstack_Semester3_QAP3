const express = require("express");
const router = express.Router();
// const mngrDal = require('../services/pg.mngr.dal')
const mngrDal = require("../services/m.mngr.dal");

router.get("/", async (req, res) => {
  // const theActors = [
  //     {first_name: 'Youn', last_name: 'Yuh-jung'},
  //     {first_name: 'Laura', last_name: 'Dern'},
  //     {first_name: 'Regina', last_name: 'King'}
  // ];
  try {
    let theActors = await mngrDal.getActors();
    if (DEBUG) console.table(theActors);
    res.render("mngr", { theActors });
  } catch {
    res.render("503");
  }
});

router.get("/:id", async (req, res) => {
  // const anActor = [
  //     {first_name: 'Regina', last_name: 'King'}
  // ];
  try {
    let anActor = await mngrDal.getActorByActorId(req.params.id); // from postgresql
    if (anActor.length === 0) res.render("no record");
    else res.render("mngr", { anActor });
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
  if (DEBUG) console.log("mngr.POST");
  try {
    await mngrDal.addActor(
      req.body.genres,
      req.body.title,
      req.body.rated,
      req.body.year
    );
    res.redirect("/mngr/");
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
    await mngrDal.putActor(
      req.params.id,
      req.body.genres,
      req.body.title,
      req.body.rated,
      req.body.year
    );
    res.redirect("/mngr/");
  } catch {
    // log this error to an error log file.
    res.render("503");
  }
});
router.patch("/:id", async (req, res) => {
  if (DEBUG) console.log("movies.PATCH: " + req.params.id);
  try {
    await mngrDal.patchActor(
      req.params.id,
      req.body.genres,
      req.body.title,
      req.body.rated,
      req.body.year
    );
    res.redirect("/mngr/");
  } catch {
    // log this error to an error log file.
    res.render("503");
  }
});
router.delete("/:id", async (req, res) => {
  if (DEBUG) console.log("movies.DELETE: " + req.params.id);
  try {
    await mngrDal.deleteActor(req.params.id);
    res.redirect("/mngr/");
  } catch {
    // log this error to an error log file.
    res.render("503");
  }
});

module.exports = router;
