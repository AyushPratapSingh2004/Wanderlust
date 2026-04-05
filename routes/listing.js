
const express = require("express");

const router = express.Router();

const Listing = require( "../models/listing.js");

const {isLoggedIn} = require("../middleware.js");

const listingController = require("../controllers/listings.js");

const multer = require("multer");

const {storage } = require("../cloudConfig.js");

const upload = multer({storage});

//const upload = multer({dest : "uploads/"});





router.route("/")
.get( listingController.index)


 .post( isLoggedIn ,
        upload.single("image"),
        listingController.createListings)






//new listing form
router.get("/new",isLoggedIn,listingController.renderNewForm);

//show Listings route
router.get("/:id",listingController.showListings);



//edit route update listings form
router.get("/:id/edit",isLoggedIn,listingController.renderEditForm);


//update listings
router.put("/:id" ,isLoggedIn,upload.single("listing[image]"),listingController.updateListings  );


//delete route
router.delete("/:id",isLoggedIn,listingController.destroyListings)

module.exports = router;