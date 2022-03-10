const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs"); // Templating Engine
const http = require("http");
const cookieParser = require("cookie-parser");
const validator = require("express-validator");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const passport = require("passport");

const container = require("./container");
const e = require("connect-flash");

container.resolve(function (users) {
  mongoose.Promise = global.Promise;
  mongoose.connect("mongodb://localhost:27017/chatapp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => console.log("Connected to MongoDB")).catch(err => console.log(`Couldn't connect to MongoDB : [${err}]`));

  // We will have configuration for our application in this block
  // There are different ways to configure the express app

  const app = setupExpress();

  function setupExpress() {
    const app = express();
    const server = http.createServer(app);
    server.listen(3000, () => {
      console.log("Listening on port 3000");
    });

    configureExpress(app);

    // Setup Router, pass the controllers from the argument and then init routing like done below
    const router = require("express-promise-router")();
    users.SetRouting(router);

    app.use(router);
  }

  function configureExpress(app) {
    // Add config for body-parser, ejs etc etc
    app.use(express.static("public")); // Express will be able to make use of every static file inside this folder (images, css, js)
    app.set("view engine", "ejs"); // Set view Engine
    app.use(cookieParser());
    app.use(validator());
    app.use(
      session({
        secret: "thisisarandomsecretkey",
        resave: true,
        saveUninitialized: false,
        store: MongoStore.create({
          mongoUrl: "mongodb://rootuser:rootpass@localhost:27017",
        }),
      })
    );
    app.use(flash());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true })); // Config for body parser

    // It is important to add passport after session code, otherwise it will start throwing errors
    app.use(passport.initialize());
    app.use(passport.session());
  }
});
