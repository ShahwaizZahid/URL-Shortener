const express = require("express");
const mongoose = require("mongoose");
const urlRoute = require("./routes/url.js");
const { connectToMongo } = require("./connect.js");
const URL = require("./models/url.js");
const app = express();
const cors = require("cors");
require("dotenv").config();
const MONGO = process.env.MONGO;
app.use(express.json());
const {
  handleGenerateNewUrl,
  handleGetAnalytics,
  handleRequestUrl,

} = require("./controller/url.js");


connectToMongo(
MONGO
).then(() => {
  console.log("Mongo DB successfully connected !");
});
app.use(cors());

const PORT = process.env.PORT;

app.use("/url", urlRoute);

app.listen(PORT, () => {
  console.log(`Server successfully runs at port ${PORT} !`);
});
