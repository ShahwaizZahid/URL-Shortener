const shortid = require("shortid");
const URL = require("../models/url.js");

async function handleGenerateNewUrl(req, res) {
  try {
    const body = req.body;
    const shortID = shortid();

    await URL.create({
      shortId: shortID,
      redirectURL: body.url,
      visitHistory: [],
    });
    res.send({ id: shortID });
  } catch (e) {
    console.log(e);
  }
}

async function handleGetAnalytics(req, res) {
  const urls = await URL.find();
  return res.json(urls);
}

async function handleRequestUrl(req, res) {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: { timeStamp: Date.now() },
      },
    }
  );
  res.redirect(entry.redirectURL);
}

module.exports = {
  handleGenerateNewUrl,
  handleGetAnalytics,
  handleRequestUrl,
};
