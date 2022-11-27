var router = require("express").Router();
const awardsDal = require("../../services/awards.dal");

// api/awards path
router.get("/", async (req, res) => {
  if (DEBUG) console.log("ROUTE: /api/awards/ GET " + req.url);
  try {
    let theAwards = await awardsDal.getAwards(); // from Mongo not postgresql
    res.statusCode = 200;
    console.log("Awards.js??");
    res.json(theAwards);
  } catch {
    // log this error to an error log file.
    res.statusCode = 200;
    res.json({ message: "Service Unavailable", status: 200 });
  }
});

module.exports = router;
