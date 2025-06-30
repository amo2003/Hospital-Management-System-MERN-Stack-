const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
    name:{
        type:String, //datatype
        required:true, //validation
    },
    amount:{
        type:String, //datatype
        required:true, //validation
     },
    number:{
        type:String, //datatype
        required:true, //validation
     },
     date:{
        type:String, //datatype
        required:true, //validation
     }
});

module.exports = mongoose.model(
    "Payment", //file name
    PaymentSchema //function name
)