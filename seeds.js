var mongoose = require("mongoose");
var Campground = require("./v3/models/campground");
var Comment = require("./v3/models/comment");


var data = [{
        name: "Cloud's rest",
        image: "https://farm1.staticflickr.com/649/32262472514_b6c653e249.jpg",
        description: "This place is near to my friend's home called Sundar Ghimire!!",
    },
    {
        name: "phoksundo lake",
        image: "https://farm9.staticflickr.com/8427/7748701300_bcda66fe3b.jpg",
        description: "This lake is in Nepal and camping here is just Amazing!!"
    },
    {
        name: "hill camp",
        image: "https://farm8.staticflickr.com/7161/6498260841_dc8e89d348.jpg",
        description: "This place is in Parbat Nepal. view from here is amazing and you  will love  the beauty of nature!!",
    },
    {
        name: "Everest camp",
        image: "https://farm3.staticflickr.com/2929/14133201694_d5eba95ca0.jpg",
        description: "MountEverest is the highest peak in the world and camping here is just amazing!! "
    }
]
//REmove all campgrounds

function seedDB() {
    Campground.remove({}, function (err) {
           if (err) {
               console.log(err);
           }
         console.log("removed campgrounds!");
          //Add few campgrounds
     data.forEach(function (seed) {
           Campground.create(seed, function (err, campground) {
                 if (err) {
                         console.log(err)
                    } else {
                    console.log("added a campground");
                   // create a comment
                    Comment.create({
                             text: "This place is great, but i wish there was internet",
                             author: "Homer"
                        }, function (err, comment) {
                                if (err) {
                                     console.log(err);
                                   } else {
                                       campground.comments.push(comment);
                                          campground.save();
                                          console.log("created new comments");
                                      }
                                   });
                        
                          }
                             });
                          });
                    });
                }
                module.exports = seedDB;