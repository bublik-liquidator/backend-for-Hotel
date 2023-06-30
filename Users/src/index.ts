const createError = require("http-errors");
const express = require("express");
const logger = require("morgan");
//require('dotenv').config();
const timeout = require('connect-timeout');

require("dotenv").config({ path: "../.env" });
const indexController = require("./controller/indexControler");
const meetupsController = require("./controller/meetupsController");

const pino = require("pino");
const pretty = require("pino-pretty");
const loggerr = pino(pretty());

const bodyParser = require("body-parser");

const app = express();
const port = process.env.INDEX_APP_PORT;

app.use(logger("dev"));

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use("/", indexController);
app.use("/meetup", meetupsController);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

app.listen(port, () => {
  loggerr.info("Running on port " + port);
  //console.log(`Running on port ${port}.`);
});

// app.use(timeout('120s'));

// app.use(function(req, res, next) {
//   if (!req.timedout) next();
// });
{
  // router.get("/meetup",  db.getMeetup);
  // router.get("/meetup/:id", db.getMeetupById);
  // router.post("/meetup", db.createMeetup);
  // router.put("/meetup/:id", db.updateMeetup);
  // router.delete("/meetup/:id", db.deleteMeetup);
  // process.on
  // (
  //     'uncaughtException',
  //     function (err)
  //     {
  //         console.log(err)
  //         var stack = err.stack;
  //         return null;
  //         //you can also notify the err/stack to support via email or other APIs
  //     }
  // );
  // const errorHandler = (error, request, response, next) => {
  //     // Error handling middleware functionality
  //     console.log(`error ${error.message}`) // log the error
  //     const status = error.status || 400
  //     // send back an easily understandable error message to the caller
  //     response.status(status).send(error.message)
  // }
  // app.use(errorHandler)
}
