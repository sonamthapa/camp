  var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    Campground = require("./v3/models/campground"),
    Comment = require("./v3/models/comment"),
    User = require("./v3/models/user"),
    seedDB = require("./seeds")

  //requring route
  var commentRoutes = require("./v5/routes/comments"),
      campgroundRoutes = require("./v5/routes/campgrounds"),
      indexRoutes = require("./v5/routes/index")
      //  seedDB();

  // app.use(express.static(__dirname + change garrney part yeta hunnxa ...));
   mongoose.connect("mongodb://localhost/camp", {
    useMongoClient: true,
  });
  mongoose.Promise = global.Promise;


  //support parsing of application/json type post data
  app.use(bodyParser.urlencoded({
    extended: true
  }))
  app.set("view engine", "ejs");
  app.use(express.static(__dirname + "/v4"));

  //PASSPORT CONFIGURATION
  app.use(require("express-session")({
    secret: "once again she is the cutest one",
    resave: false,
    saveUninitialized: false
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  passport.use(new LocalStrategy(User.authenticate()));
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());

  //MIDDLEWARE
  //currentUser:req.user will be added to every single route and templates  
  app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    next();
  });
  app.use("/",indexRoutes);
  app.use("/campgrounds", campgroundRoutes);
  app.use("/campgrounds/:id/comments", commentRoutes);


  app.listen(process.env.PORT || 3000, function () {
    console.log("the camp server started");
  });

  