const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AppointmentSchema = new Schema({
  doctorId: {
    type: Schema.Types.ObjectId,
    ref: "DoctorRegister",
    required: true
  },
  doctorName: {
      type: String,
      required: true,

  },
  specialization: {
    type: String,
    required: true,    
  },
  patientName: {
    type: String,
    required: true,       
  },
  date: {
    type: String,
    required: true,   
  },
  time: {
    type: String,
    required: true,   
  },
  reason: {
    type: String,
    required: true,   
  },
});

module.exports = mongoose.model("Appointment", AppointmentSchema);
