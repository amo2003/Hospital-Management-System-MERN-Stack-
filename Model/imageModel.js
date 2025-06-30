const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    Image:{
        type:String, //datatype
        required:true, //validation
    },
    
});

module.exports = mongoose.model(
    "ImageModel", //file name
    ImageSchema //function name
)