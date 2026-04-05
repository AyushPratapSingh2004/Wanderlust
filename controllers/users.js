
const User = require("../models/user");


module.exports.userSignupForm = (req,res)=>{

    res.render("users/signup.ejs");
}


module.exports.userLoginForm = (req,res)=>{

    res.render("users/login.ejs");
}



module.exports.userSignup = async(req,res)=>{


    let{username,email,password} = req.body;

    const newUser = new User({username,email});

   const registeredUser= await User.register(newUser,password);

   console.log(registeredUser); 

   req.login(registeredUser,(err)=>{

    if(err){

        return(next(err));
    
    }

    req.flash("success","welcome to wanderlust")

   res.redirect("/listings");


   })

}


module.exports.userLogin =  async(req,res)=>{
                            
                          req.flash("success", `welcome back to wanderlust  `);

                          let redirectUrl = res.locals.redirectUrl || "/listings";

                          res.redirect(redirectUrl);
                         // res.redirect(res.locals.redirectUrl || "/listings");

                        }


module.exports.userLogout = (req,res,next)=>{

    req.logout((err)=>{

        if(err){

            next(err);
        }

        req.flash("success","you are logged out");
        res.redirect("/listings");
    });
}