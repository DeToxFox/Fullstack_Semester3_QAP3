const { ObjectId } = require("mongodb");
const dal = require("./mdb");

async function getActors() {
  if (DEBUG) console.log("actors.mongo.dal.getActors()");
  try {
    await dal.connect();
    const cursor = dal.db("sample_mflix").collection("movieList").find();
    const results = await cursor.toArray();
    return results;
  } catch (error) {
    console.log(error);
  }
}

async function getActorByActorId(id) {
  if (DEBUG) console.log("actors.mongo.dal.getActorByActorId()");
  try {
    await dal.connect();
    const result = dal
      .db("sample_mflix")
      .collection("movieList")
      .findOne({ _id: ObjectId(id) });
    return result;
  } catch (error) {
    console.log(error);
  }
}
async function addActor(genres, title, rated, year) {
  if (DEBUG) console.log("actors.mongo.dal.addActor()");
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
      .collection("movieList")
      .insertOne(newLogin);
    return result.insertedId;
  } catch (error) {
    console.log(error);
  }
}

async function putActor(id, genres, title, rated, year) {
  if (DEBUG) console.log("actors.mongo.dal.putActor()");
  try {
    await dal.connect();
    const result = await dal
      .db("sample_mflix")
      .collection("movieList")
      .replaceOne(
        { _id: ObjectId(id) },
        { genres: genres, title: title, rated: rated, year: year }
      );
    return result;
  } catch (error) {
    console.log(error);
  }
}

async function patchActor(id, genres, title, rated, year) {
  if (DEBUG) console.log("actors.mongo.dal.patchActor()");
  try {
    await dal.connect();
    const result = await dal
      .db("sample_mflix")
      .collection("movieList")
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
async function deleteActor(id) {
  if (DEBUG) console.log("actors.mongo.dal.deleteActor()");
  try {
    await dal.connect();
    const result = dal
      .db("sample_mflix")
      .collection("movieList")
      .deleteOne({ _id: ObjectId(id) });
    return result;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getActors,
  getActorByActorId,
  addActor,
  putActor,
  patchActor,
  deleteActor,
};
