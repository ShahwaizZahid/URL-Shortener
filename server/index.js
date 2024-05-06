const express = require("express");
const mongoose = require("mongoose");
const URL = require("./models/url.js");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const useRouter = require("./routes/user.js");
const urlRoute = require("./routes/url.js");

const { connectToMongo } = require("./connect.js");
const { restrictToLoggedinUserOnly } = require("./middlewares/auth.js");

const app = express();
require("dotenv").config();

app.use(cookieParser());
app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.urlencoded({ extended: true }));
const MONGO = process.env.MONGO;
const PORT = process.env.PORT;

connectToMongo(MONGO).then(() => {
  console.log("Mongo DB successfully connected !");
});

app.use("/url", restrictToLoggedinUserOnly, urlRoute);

app.use("/user", useRouter);

app.listen(PORT, () => {
  console.log(`Server successfully runs at port ${PORT} !`);
});
