var express = require("express");
var router = express.Router({mergeParams:true});
var Campground = require("../../v3/models/campground")
var Comment = require("../../v3/models/campground")



//COMMENTs NEW
router.get("/new",isLoggedIn, function (req, res) {
    //find cMPGROUND BY ID
    Campground.findById(req.params.id, function (err, campground) {
      if (err) {
        console.log(err);
      } else {
        res.render("comments/new", {
          campground: campground
        });
      }
    })
  });
  //COMMENTS CREATE
  router.post("/",isLoggedIn, function (req, res) {
    //lookup campground using id
    Campground.findById(req.params.id, function (err, campground) {
      if (err) {
        console.log(err);
        res.redirect("/campgrounds");
      } else {
        Comment.create(req.body.comment, function (err, comment) {
          if (err) { 
            console.log(err);
          } else { 
            //add username and id to that comment   
          //  console.log("new comment's username" + req.user.username);
             comment.author.id = req.user._id;
             comment.author.username = req.user.username;
            // save comment
             comment.save();
            campground.comments.push(comment);
            campground.save();
            console.log(comment);

            res.redirect('/campgrounds/' + campground._id);
          }
        });
    }
    });

  });
     //middleware
    function isLoggedIn(req,res,next){
      if(req.isAuthenticated()){
      return next();
    }
    res.redirect("/login");
  }

   module.exports = router;