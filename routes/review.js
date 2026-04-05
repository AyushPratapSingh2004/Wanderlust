const experess = require("express");

const router = experess.Router({mergeParams:true});

const Review = require("../models/review.js");
const Listing = require( "../models/listing.js");


router.post("/",async(req,res)=>{

    let listing = await Listing.findById(req.params.id);

    let newReview = new Review(req.body.review);

    listing.reviews.push(newReview);

   await newReview.save();
    await listing.save();

    console.log(listing);
    console.log(newReview);
    res.send("review saved");
});

module.exports = router;