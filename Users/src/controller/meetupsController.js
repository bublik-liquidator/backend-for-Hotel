const express = require("express");
const router = express.Router();
const meetupService = require("../service/meetupService");

router.get("/", async (req, res) => {
  var page = parseInt(req.query.page);
  var limit = parseInt(req.query.limit);

  if (isNaN(page)) {
    page = 1;
  }
  if (isNaN(limit)) {
    limit = 10;
  }
  //res.json(meetupService.getAll(page, limit));
  const result = await meetupService.getAll(page, limit);
  res.json(result);
});

router.get("/:id", (req, res) => {
  // console.log((meetupService.getById(req.params.id)))
  // res.json(meetupService.getById(req.params.id));
  return res.json(meetupService.getById(req.params.id));
});

router.post("/", (req, res) => {
  const newmeetup = req.body;
  return res.json(meetupService.save(req, res));
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message); //подключить файл
});

//UPDATE-> PUT add

router.delete("/:id", (req, res) => {
  const meetupId = req.params.id;
  return res.json(meetupService.deleteById(meetupId));
});

//todo put

module.exports = router;
