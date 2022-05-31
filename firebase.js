const admin = require("firebase-admin");
const service_account_key = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(service_account_key),
  databaseURL: "https://nam-my-home-default-rtdb.firebaseio.com/",
});

const fs = admin.firestore();
var db = admin.database();
const data = db.ref("data");
// const sensor_board_information = fs.collection("sensor_board").doc("sensor_board_information");
// const sensor_data = fs.collection("sensor_board").doc("sensor_data");

module.exports = {data };

