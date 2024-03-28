const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    imageurl:{
        data:Buffer,
        contentType:String,
    },

},{timestamps:true}
);

const product = new mongoose.model("Products", productSchema);

module.exports = product;