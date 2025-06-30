const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PatientSchema = new Schema({
    name:{
        type:String, //datatype
        required:true, //validation
    },
     gmail:{
        type:String, //datatype
        required:true, //validation
     },
     password:{
        type:String, //datatype
        required:true, //validation
     },
     age:{
        type:Number, //datatype
        required:true, //validation
     },
     address:{
        type:String, //datatype
        required:true, //validation
     },
     contact:{
        type:String, //datatype
        required:true, //validation
     },
 

});

module.exports = mongoose.model(
    "PatientRegister", //file name
    PatientSchema //function name
)