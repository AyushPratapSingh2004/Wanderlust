const Listing = require("../models/listing");

module.exports.index = async (req,res)=>{

    const allListings = await Listing.find();

    res.render("listings/index.ejs",{allListings});
    
}



module.exports.renderNewForm = (req,res)=>{
   
    res.render("listings/new.ejs");   
}




module.exports.showListings = async(req,res)=>{

    let{id}= req.params;
 
    const listing =  await Listing.findById(id);
    
    res.render("listings/show.ejs",{listing});
   // console.log(listing.title);
   // console.log(id);
}




module.exports.createListings = async(req,res,next)=>{

    let url = req.file.path;
    let filename = req.file.filename;
 


    try {
        
       let{title,description,image,price,country,location} = req.body;

    let newlisting = new Listing({
        title:title,
        description:description,
        image:{url , filename},
        price:price,
        country:country,
        location:location
    })

   await newlisting.save();

    req.flash("success","new listing created");

    res.redirect("/listings");

    } catch (error) {
        
        next(error);
    }
}



module.exports.renderEditForm = async (req , res)=>{

    let{id} = req.params;

    let listing = await Listing.findById(id);

    res.render("listings/edit.ejs",{listing});
}



module.exports.updateListings = async(req,res)=>{

    let{id} = req.params;
   //  let{title,description,price,country,location} = req.body;
     
   let listing = await Listing.findByIdAndUpdate(id ,{...req.body.listing} );
    
if(req.file){ // this is to check if a file was uploaded 

    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = {url , filename};
    await listing.save();

}

    res.redirect(`/listings/${id}`);
}



module.exports.destroyListings =  async(req,res)=>{

    let{id} = req.params;

    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
}