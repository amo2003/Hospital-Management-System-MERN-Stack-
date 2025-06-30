const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StaffSchema = new Schema({
    name:{
        type:String, //datatype
        required:true, //validation
    },
     gmail:{
        type:String, //datatype
        required:true, //validation
     },
     password:{
         type:String,
         required: true,
     },
     stafftype:{
        type:String,
        required:true,
     },
     age:{
        type:Number, //datatype
        required:true, //validation
     },
     address:{
        type:String, //datatype
        required:true, //validatio
     }
});

module.exports = mongoose.model(
    "StaffModel", //file name
    StaffSchema //function name
)