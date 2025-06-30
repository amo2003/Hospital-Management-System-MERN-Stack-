const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DoctorRegisterSchema = new Schema({
    name:{
        type:String, //datatype
        required:true, //validation
    },
    special:{
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
     }
});

module.exports = mongoose.model(
    "DoctorRegister", //file name
    DoctorRegisterSchema //function name
)