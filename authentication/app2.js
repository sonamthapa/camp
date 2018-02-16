var express = require("express"),
    app2 = express();
    mongoose = require("mongoose"),
    passport = require("passport"),
    bodyParser = require("body-parser"),
    User = require("./model/user"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose")

   mongoose.connect("mongodb://localhost/auth_demo_app");

   app2.set("view engine", "ejs");
   app2.use(bodyParser.urlencoded({extended: true}));

   app2.use(require("express-session")({
       secret: "there is nothing to worry about life",
       resave: false,
      saveUninitialize: false
     }));
 app2.use(passport.initialize());
 app2.use(passport.session());
 passport.use(new LocalStrategy(User.authenticate()));
 passport.serializeUser(User.serializeUser());
 passport.deserializeUser(User.deserializeUser());

app2.get("/", function (req, res) {
    res.render("home");

});

app2.get("/secret", isLoggedIn, function (req, res) {
    res.render("secret");
});
// auth route
    app2.get("/register", function(req, res){
    res.render("register");
});
//handelling user sign up
    app2.post("/register", function(req , res){
    req.body.username
    req.body.password
    User.register(new User({username: req.body.username}), req.body.password, function(err,user){
        if(err){
            console.log(err);
            return res.render('register');
        }
              passport.authenticate("local")(req, res, function(){
              res.redirect("/secret");
        });
    });
     });
     //login route
     //render login form
     app2.get("/login", function (req, res){
         res.render("login");
     });
     //login logic
     //middleware
     app2.post("/login", passport.authenticate("local",{
         successRedirect: "/secret",
         failureRedirect: "/login"
     }) , function(req , res){
     });
     app2.get("/logout", function(req,res){
         req.logout();
         res.redirect("/")
     });
     
    function isLoggedIn(req,res,next){
        if(req.isAuthenticated()){
            return next();
        }
        res.redirect("/login");
    }
app2.listen(process.env.PORT || 3000, function () {
    console.log("the server has started");
});