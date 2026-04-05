const mongoose = require("mongoose");


//this lne is not that necessary we can directly use mongoose.schema
const Schema = mongoose.Schema;

const listingSchema = new Schema({

    title :{

        type : String,
        required : true,
    },

    description :{

        type : String,
    },

    image :{

        url : String,
        filename : String,
    },

    price :{

        type : Number,
        required : true,
    },

    location :{

        type : String,
        required : true,
    },

    country : {

        type : String,
        required : true,
    },


   reviews : [

    {
        type : Schema.Types.ObjectId, ref: 'review'
    }

   ]


});

const listing = mongoose.model("listing" , listingSchema);

module.exports = listing;