
const express = require("express");

const router = express.Router();

const User = require("../models/user");

const passport = require("passport");

const {saveRedirectUrl} = require("../middleware");

const userController = require("../controllers/users");


router.get("/signup",userController.userSignupForm);



router.post("/signup",userController.userSignup);


router.get("/login",userController.userLoginForm);


router.post("/login" ,  saveRedirectUrl ,  passport.authenticate( "local" , 
                                          {failaureRedirect : "/login" , 
                                           failaureFlash : true } ) ,   
                                          
                            userController.userLogin   );


                            
router.get("/logout",userController.userLogout);

module.exports = router;