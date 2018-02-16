  var express = require("express");
  var router = express.Router({mergeParams:true});
  var Campground = require("../../v3/models/campground")
//   var Campground = require("../models/campground")
//  var Comment = require("../models/comment")
 
 //INDEX- show all campgrounds
 router.get("/", isLoggedIn,function (req, res) {
    //CONTAINS ALL THE INFO OF THE LOGGEDIN USER(username and userid)
    //get all campgrounds from DB
    Campground.find({}, function (err, allCampgrounds) {
      if (err) {
        console.log(err);
      } else {
        res.render("campgrounds/index", {
          campgrounds: allCampgrounds,
          currentUser: req.user
        });
      }
    });
  });
  //CREATE-add new campground to db
  router.post("/",isLoggedIn ,function (req, res) {
    //res.send("YOU HIT THE POST ROUTE!")
    //get data from form and add to campgrounds array
    const name = req.body.name;
    const image = req.body.image_url;
    const desc = req.body.description;
          author = {
            id: req.user._id,
             username: req.user.username
          }
    const newCampground = {
      name: name,
      image: image,
      description: desc,
      author:author
      }
  
    //create a new campground and save it to a database
    Campground.create(newCampground, function (err, newlyCreated) {
      if (err) {
        console.log(err);
      } else {
        //redirect back to campground page
        console.log(newlyCreated);
        res.redirect("/campgrounds");
      }
    });
  });
  //NEW- show form to create new campground
  router.get("/new", isLoggedIn, function (req, res) {
    res.render("campgrounds/new");
  });
  //SHOW- Show more info about one campground
  router.get("/:id",isLoggedIn, function (req, res) {
    //find the campground with provided id
    Campground.findById(req.params.id).populate("comments").exec(function (err, foundCampground) {
      if (err) {
        console.log(err);
      } else {
        console.log(foundCampground);
        //render show templates with that campground
        res.render("campgrounds/show", {
          campground: foundCampground
        });
      }
    });
  });

  
  // // Nay add gareko ho yo oooooo
  
   router.post("/:id/comments",(req,res)=>{
    let id = req.params.id;
    let commentText = req.body.comment;
     console.log(id, commentText);
    res.render("/")
 });



   //middleware
   function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
      return next();
    }
    res.redirect("/login");
  }

  module.exports = router;