var router = require("express").Router();
//const actorsDal = require('../../services/pg.movies.dal')
const actorsDal = require("../../services/m.movies.dal");

// api/movies
router.get("/", async (req, res) => {
  if (DEBUG) console.log("ROUTE: /api/movies/ GET " + req.url);
  try {
    let theActors = await actorsDal.getActors();
    res.json(theActors);
  } catch {
    // log this error to an error log file.
    res.statusCode = 503;
    res.json({ message: "Service Unavailable", status: 503 });
  }
});
// api/movies/:id
router.get("/:id", async (req, res) => {
  if (DEBUG) console.log("ROUTE: /api/movies/:id GET " + req.url);
  try {
    let anActor = await actorsDal.getActorByActorId(req.params.id);
    if (anActor.length === 0) {
      // log this error to an error log file.
      res.statusCode = 404;
      res.json({ message: "Not Found", status: 404 });
    } else res.json(anActor);
  } catch {
    // log this error to an error log file.
    res.statusCode = 503;
    res.json({ message: "Service Unavailable", status: 503 });
  }
});
router.post("/", async (req, res) => {
  if (DEBUG) {
    console.log("ROUTE: /api/movies/ POST");
    //    console.log(req);
  }
  try {
    await actorsDal.addActor(req.body.title, req.body.year);

    res.statusCode = 201;
    res.json({ message: "Created", status: 201 });
  } catch {
    // log this error to an error log file.
    res.statusCode = 503;
    res.json({ message: "Service Unavailable", status: 503 });
  }
});
router.put("/:id", async (req, res) => {
  if (DEBUG) console.log("ROUTE: /api/movies PUT " + req.params.id);
  try {
    await actorsDal.putActor(
      req.params.id,
      req.body.genres,
      req.body.title,
      req.body.rated,
      req.body.year
    );
    res.statusCode = 200;
    res.json({ message: "OK", status: 200 });
  } catch {
    // log this error to an error log file.
    res.statusCode = 503;
    res.json({ message: "Service Unavailable", status: 503 });
  }
});
router.patch("/:id", async (req, res) => {
  if (DEBUG) console.log("ROUTE: /api/movies PATCH " + req.params.id);
  try {
    await actorsDal.patchActor(
      req.params.id,
      req.body.genres,
      req.body.title,
      req.body.rated,
      req.body.year
    );
    res.statusCode = 200;
    res.json({ message: "OK", status: 200 });
  } catch {
    // log this error to an error log file.
    res.statusCode = 503;
    res.json({ message: "Service Unavailable", status: 503 });
  }
});
router.delete("/:id", async (req, res) => {
  if (DEBUG) console.log("ROUTE: /api/movies DELETE " + req.params.id);
  try {
    await actorsDal.deleteActor(req.params.id);
    res.statusCode = 200;
    res.json({ message: "OK", status: 200 });
  } catch {
    // log this error to an error log file.
    res.statusCode = 503;
    res.json({ message: "Service Unavailable", status: 503 });
  }
});
// list the active api routes
if (DEBUG) {
  router.stack.forEach(function (r) {
    if (r.route && r.route.path) {
      console.log(r.route.path);
    }
  });
}

module.exports = router;
