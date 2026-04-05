module.exports.isLoggedIn =  ( req,res,next)=>{

     if(!req.isAuthenticated()){

        req.session.redirectUrl = req.originalUrl;
       console.log(req.session.redirectUrl);
        req.flash("error", "you must login ");
        return  res.redirect("/login");
    }

else{
       next();
               } 
}


module.exports.saveRedirectUrl = (req,res,next)=>{

    if(req.session.redirectUrl){
       
        res.locals.redirectUrl = req.session.redirectUrl;
    }

    next();
};