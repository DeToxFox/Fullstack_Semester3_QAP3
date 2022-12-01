const express = require("express");
const methodOverride = require("method-override");
const app = express();
const PORT = 3010;

global.DEBUG = true;
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true })); // This is important!
app.use(methodOverride("_method")); // So is this!

app.get("/", (req, res) => {
  res.render("index.ejs", { name: "David Turner" });
});
app.get("/about", (request, response) => {
  response.render("about.ejs");
});

const moviesRouter = require("./routes/movies");
app.use("/movies", moviesRouter);
const staffRouter = require("./routes/staff");
app.use("/staff", staffRouter);
const mngrRouter = require("./routes/mngr");
app.use("/mngr", mngrRouter);

// anything beginning with "/api" will go into this
const apiRouter = require("./routes/api/movies");
app.use("/api/movies", apiRouter);

app.use((req, res) => {
  res.status(404).render("404");
});

app.listen(PORT, () => {
  console.log(`Simple app running on port ${PORT}.`);
});
