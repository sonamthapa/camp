var express = require("express");
var router = express.Router();
var passport = require("passport");
var User  = require("../../v3/models/user");


//ROOT ROUTE
  router.get("/", function (req, res) {
    res.render("landing");
  });
  
  //AUTH ROUTE
  //  show register form
  router.get("/register", function(req,res){
    res.render("register");
  });
//handle sign up logic

   router.post("/register", function(req,res){
     var newUser = new User({username: req.body.username});
     User.register(newUser, req.body.password, function(err,user){
       if(err){
         console.log(err);
         return res.render("register")
       }
       passport.authenticate("local")(req,res,function(){
         res.redirect("/campgrounds");
       });
     });
   });

   //SHOW LOGIN FORM
  //app.post("/login",middleware,callbackfunction)
  router.get("/login",function(req,res){
    res.render("login");
  });
  router.post("/login", passport.authenticate("local",
  { 
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
  }),function(req,res){
  });
  //LOGOUT ROUTE
  router.get("/logout",function(req,res){
    req.logout();
    res.redirect("/campgrounds");
  });

  //middleware
  function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
      return next();
    }
    res.redirect("/login");

  }
  module.exports = router;