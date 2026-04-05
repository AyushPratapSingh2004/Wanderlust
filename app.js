
if(process.env.NODE_ENV != "production"){
require("dotenv").config();
}

//console.log(process.env);


const express = require("express");

const app = express();

const port = 8080;

const path = require("path");

const mongoose = require('mongoose');

const session = require("express-session");

const MongoStore = require('connect-mongo').default;

const flash = require("connect-flash");

const passport = require("passport");

const LocalStrategy = require("passport-local");

const User = require("./models/user.js");


const dbUrl = process.env.ATLASDB_URL;

const store = MongoStore.create({

    mongoUrl : dbUrl,
    crypto:{

        secret :process.env.SECRET
    },

    touchAfter :24*3600 , 
});

store.on("error",()=>{

    console.log("error in mongoStrore",err) ;
})


const sessionOptions = {
    store,
    secret :process.env.SECRET,
    resave:false,
    saveUninitialized:true,

    cookie :{

        expires : Date.now() + 7* 24 *60 * 60 * 1000 , // 7 days 24 hours 60 min 60 sec 1000ms
        maxAge : 7* 24 *60 * 60 * 1000 ,// expiry date
        httpOnly: true
    },
};



const methodOverride = require("method-override");

const ejsMate = require("ejs-mate");

// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

// const dbUrl = process.env.ATLASDB_URL;


const listingsRouter = require("./routes/listing.js");
const reviewsRouter =  require("./routes/review.js");
const userRouter = require("./routes/user.js");


app.engine("ejs",ejsMate);

app.set("view engine","ejs");

app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"/public")));

app.use(express.urlencoded({extended:true}));

app.use(methodOverride("_method"));


// const dbUrl = process.env.ATLASDB_URL;   i have defined above store

main()
.then(()=>{ 
    
    console.log("connected to database");
})
.catch(err => console.log(err));

async function main() {

    await mongoose.connect(dbUrl);
//   await mongoose.connect(MONGO_URL);

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}




app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get("/demouser", async(req,res)=>{

    let fakeUser = new User ({
        email:"student@gmail.com",
        username : "delta-man"
    }); 

    let registeredUser = await User.register(fakeUser,"iamAush@123");
    res.send(registeredUser);
})




app.use((req,res,next)=>{

    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user ;
    next();
})

app.use("/listings",listingsRouter);
app.use("/listings/:id/review",reviewsRouter);
app.use("/",userRouter);

// app.get("/testListing", async (req,res)=>{

//     let sampleListing = new Listing({

//         title : "My home ",
//         description : "house near beach",
//         price : 1500,
//         location : "Goa",
//         country : "India",
//     }
//     )

//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("sucessfull testing");
    
// })

// app.get("/listings",async (req,res)=>{

//     const allListings = await Listing.find();

//     res.render("listings/index.ejs",{allListings});
    
// })


// app.get("/listings/new",(req,res)=>{

//     res.render("listings/new.ejs")
// })

// app.get("/listings/:id",async(req,res)=>{

//     let{id}= req.params;
 
//     const listing =  await Listing.findById(id);
    
//     res.render("listings/show.ejs",{listing});
//     console.log(listing.title);
//     console.log(id);
// })

// app.post("/listings", async(req,res,next)=>{

//     try {
        
//        let{title,description,image,price,country,location} = req.body;

//     let newlisting = new Listing({
//         title:title,
//         description:description,
//         image:image,
//         price:price,
//         country:country,
//         location:location
//     })

//    await newlisting.save().then((res)=>{
        
//         //console.log(res);
//     })

//     res.redirect("/listings");

//     } catch (error) {
        
//         next(error);
//     }
// });

// app.get("/listings/:id/edit",async (req , res)=>{

//     let{id} = req.params;

//     let listing = await Listing.findById(id);

//     res.render("listings/edit.ejs",{listing});
// })

// app.put("/listings/:id" ,  async(req,res)=>{

//     let{id} = req.params;
//      let{title,description,image,price,country,location} = req.body;
//     await Listing.findByIdAndUpdate(id ,{...req.body.listing} );
    
    

//     res.redirect(`/listings/${id}`);
// })

// app.delete("/listings/:id", async(req,res)=>{

//     let{id} = req.params;

//     await Listing.findByIdAndDelete(id);
//     res.redirect("/listings");
// })

// app.post("/listings/:id/review",async(req,res)=>{

//     let listing = await Listing.findById(req.params.id);

//     let newReview = new Review(req.body.review);

//     listing.reviews.push(newReview);

//    await newReview.save();
//     await listing.save();

//     console.log(listing);
//     console.log(newReview);
//     res.send("review saved");
// });


// app.use((err,req,res,next)=>{

//     res.send("something went wrong !");
// });

app.listen(port , ()=>{

    console.log(`listening through port ${port}`);
}) 