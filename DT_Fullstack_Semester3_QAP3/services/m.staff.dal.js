const { ObjectId } = require("mongodb");
const dal = require("./mdb");

async function getMovies() {
  if (DEBUG) console.log("staff.mongo.dal.getMovies()");
  try {
    await dal.connect();
    const cursor = dal.db("sample_mflix").collection("moviesList").find();
    const results = await cursor.toArray();
    return results;
  } catch (error) {
    console.log(error);
  }
}

async function getMoviesByMovieId(id) {
  if (DEBUG) console.log("staff.mongo.dal.getMoviesByMovieId()");
  try {
    await dal.connect();
    const result = dal
      .db("sample_mflix")
      .collection("moviesList")
      .findOne({ _id: ObjectId(id) });
    return result;
  } catch (error) {
    console.log(error);
  }
}
async function addMovie(genres, title, rated, year, theStatusCode) {
  if (DEBUG) console.log("staff.mongo.dal.addMovie()");
  let newLogin = JSON.parse(
    `{  "genres": "` +
      genres +
      `", "title": "` +
      title +
      `", "rated": "` +
      rated +
      `","year": "` +
      year +
      `" }`
  );
  try {
    await dal.connect();
    const result = await dal
      .db("sample_mflix")
      .collection("moviesList")
      .insertOne(newLogin);
    return result.insertedId;
  } catch (error) {
    theStatusCode;
    console.log(error);
  }
}

async function putMovie(id, genres, title, rated, year) {
  if (DEBUG) console.log("staff.mongo.dal.putMovie()");
  try {
    await dal.connect();
    const result = await dal
      .db("sample_mflix")
      .collection("moviesList")
      .replaceOne(
        { _id: ObjectId(id) },
        { genres: genres, title: title, rated: rated, year: year }
      );
    return result;
  } catch (error) {
    console.log(error);
  }
}

async function patchMovie(id, genres, title, rated, year) {
  if (DEBUG) console.log("staff.mongo.dal.patchMovie()");
  try {
    await dal.connect();
    const result = await dal
      .db("sample_mflix")
      .collection("moviesList")
      .updateOne(
        { _id: ObjectId(id) },
        { $set: { genres: genres, title: title, rated: rated, year: year } },
        { upsert: true, returnDocument: "after" }
      );
    return result;
  } catch (error) {
    console.log(error);
  }
}
async function deleteMovie(id) {
  if (DEBUG) console.log("staff.mongo.dal.deleteMovie()");
  try {
    await dal.connect();
    const result = dal
      .db("sample_mflix")
      .collection("moviesList")
      .deleteOne({ _id: ObjectId(id) });
    return result;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getMovies,
  getMoviesByMovieId,
  addMovie,
  putMovie,
  patchMovie,
  deleteMovie,
};
