const express = require("express");
const router = express.Router();
const MyDB = require("../db/myDB");

router.get("/beers", async (req, res) => {
  const params = req.query;
  if (params.id) {
    //get beer based on id, used for detail page.
    try {
      const result = await MyDB.getBeerById(params.id);
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  } else {
    // get beer based on style/country/flavor and sortOption, used for home page.
    const style = params.style === "all" ? null : params.style;
    const country = params.country === "all" ? null : params.country;
    const flavor = params.flavor === "all" ? null : params.flavor;
    const sortOption = params.sortOption;
    try {
      const result = await MyDB.getBeers(style, country, flavor, sortOption);
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }
});

router.get("/comments_total", async (req, res) => {
  const id = req.query.id;
  try {
    const result = await MyDB.getCommentsTotal(id);
    res.json({ total: result });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.get("/comments", async (req, res) => {
  const id = req.query.id;
  const start = parseInt(req.query.start);
  const pageSize = parseInt(req.query.page_size);
  try {
    const result = await MyDB.getComments(id, start, pageSize);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.get("/beer-styles", async (req, res) => {
  try {
    const result = await MyDB.getStyles();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.get("/countries", async (req, res) => {
  try {
    const result = await MyDB.getCountries();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.get("/flavors", async (req, res) => {
  try {
    const result = await MyDB.getFlavors();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.post("/addLike", async (req, res) => {
  const id = req.body.id;
  try {
    await MyDB.addLike(id);
    res.json({ message: "add like successfully!" });
  } catch {
    res.status(500).json({ error: err });
  }
});

router.post("/addDislike", async (req, res) => {
  const id = req.body.id;
  try {
    await MyDB.addDislike(id);
    res.json({ message: "add dislike successfully!" });
  } catch {
    res.status(500).json({ error: err });
  }
});

router.post("/addNewComment", async (req, res) => {
  const beerId = req.body.beer_id;
  const newComment = req.body.new_comment;
  const user = req.user.username;

  try {
    await MyDB.addNewComment(beerId, newComment, user);
    res.json({ message: "add new comment successfully!" });
  } catch {
    res.status(500).json({ error: err });
  }
});

module.exports = router;
