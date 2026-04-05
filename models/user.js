const mongoose = require("mongoose");

//this lne is not that necessary we can directly use mongoose.schema
const Schema = mongoose.Schema;

const  passportLocalMongoose  = require("passport-local-mongoose").default;


const userSchema = new Schema(
    {

        email: {

            type:String , 
            required :true
        }

    }
);

// we dont have to define username and password because its done by passport-locAL-MONGOOSE

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User",userSchema);
