const router = require("express").Router();
// const lyricsFinder = require("lyrics-searcher");

router.get("/", async (req, res) => {
  try {
    const stripeCustomer = req.headers.stripeCustomer
    // const lyrics = await lyricsFinder(req.query.artist, req.query.name);
    // res.json({ lyrics });
  } catch (error) {
    const lyrics = "No Lyrics Found";
    res.json({ lyrics });
  }
});

module.exports = router;
