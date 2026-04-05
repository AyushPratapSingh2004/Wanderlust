const mongoose = require("mongoose");


//this lne is not that necessary we can directly use mongoose.schema
const Schema = mongoose.Schema;

const reviewSchema = new Schema(
    {

        comment:String,
        rating:{

            type :Number,
            min :1,
            max:5
        },

        createdAt:{

            type :Date,
            default:Date.now(),
        },
        
    }
)


module.exports = mongoose.model("review", reviewSchema);