const dal = require("./db");
const express = require("express");
const { client } = require("./db");
const { render } = require("ejs");

const app = express();

//get all awards.
// var getAwards = function() {
//   if(DEBUG) console.log("awards.dal.getAwards()");
//   return new Promise(function(resolve, reject) {
//     const sql = "SELECT award_id, name FROM award;"
//      //   ORDER BY award_id DESC LIMIT 7;"
//     if(DEBUG) console.log(sql);
//     dal.query(sql, [], (err, result) => {
//       if (err) {
//         // logging should go here
//         if(DEBUG) console.log(err);
//         reject(err);
//       } else {
//         resolve(result.rows);
//       }
//     });
//   });
// };

// var getAwards = app.get("/first_collection", async function (req, res) {
//   const dbConnect = dbo.getDb();
//   dbConnect
//     .collection("myFirstCollection")
//     .find({})
//     .limit(50)
//     .toArray(function (err, result) {
//       if (err) {
//         res.status(400).send("Error fetching items from first collection!");
//       } else {
//         res.json(result);
//       }
//     });
// });

async function getAwards() {
  // code used to connect to postman from DB course
  // const dbConnect = dbo.getDb();
  //   dbConnect
  const awards = await client
    .db("fall_2022_test")
    .collection("myFirstCollection")
    .find();
  // console.log(result)
  // toArray method allows the results to be served
  const results = await awards.toArray();
  return results;
}

module.exports = {
  getAwards,
};
