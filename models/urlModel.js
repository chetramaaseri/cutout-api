const mongoose = require("mongoose");

const urlSchema = mongoose.Schema({
    longUrl :{
        type:String,
        required :["true","Please Enter Long Url"]
    },
    route:{
        type:String,
        required :["true","Please Enter Route of Short Url"]
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId
    }
},
{
    timestamps: true 
})

module.exports = mongoose.model("Url",urlSchema);