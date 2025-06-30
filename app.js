const express = require("express");
const mongoose = require("mongoose");
const router = require("./Routes/StaffRoutes");
const paymentrouter = require("./Routes/PaymentRoutes");


const app = express();
const cors = require("cors");

//middleware
app.use(express.json());
app.use(cors());
app.use("/Staffs", router);
app.use("/payments", paymentrouter);

app.use("/files", express.static("files"));

mongoose.connect("mongodb+srv://<username>:<password>@cluster0.ndjygyf.mongodb.net/")
.then(()=> console.log("Connected to MongoDB"))
.then(()=> {
    app.listen(5000);
})
.catch((err)=> console.log((err)));



//doctor, call Register model

require("./Model/DoctorRegister");
const Doctor = mongoose.model("DoctorRegister");
app.post("/register", async(req,res) => {
    const {name,gmail,special,password} = req.body;
    try{
        await Doctor.create({
            name,
            gmail,
            special,
            password,
        
        })
        res.send({status: "ok"});
    }catch(err){
        res.send({status: "err"});
    }
})

//doctor login--------------

app.post("/login", async (req, res) => {
    const { gmail, password} = req.body;
        try{
            const client = await Doctor.findOne({gmail});
            if(!client){
                return res.json({err:"client Not found"})
            }
            if(client.password === password) {
                return res.json({ err: "ok" });
            }else{
                return res.json({ err: "inccorect Password"});
            }
        }catch(err){
            console.error(err);
            res.status(500).json({err:"server Err"})
        }
});

//get doctor registers
app.get("/getClients", async (req, res) => {
  try {
    const clients = await Doctor.find({});
    res.json({ status: "ok", data: clients });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

//delete doctor
// Delete user by ID
app.delete('/deleteClient/:id', async (req, res) => {
  try {
    const clientId = req.params.id;
    await Doctor.findByIdAndDelete(clientId);
    res.json({ status: "ok", message: "User deleted" });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

//--------------------------------------------------------------------

//image part
require("./Model/imageModel");

const ImageSchema = mongoose.model("ImageModel");

const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "files/")
    },
    filename: function (req,file, cb){
        const uniqueSuffix = Date.now();
        cb(null,uniqueSuffix + file.originalname);

    }
});

const uploading = multer({storage: storage});

app.post("/uplodeImage", uploading.single("image"),async(req,res) => {
    console.log(req.body);
    const imageName = req.file.filename;

    try{
        await ImageSchema.create({Image:imageName});
        res.json({ status: "ok"});
    }catch(error){
        res.json({ status: error});
    }
});

//display image

app.get("/getImage", async (req, res) => {
    try{
        ImageSchema.find({}).then((data) => {
            res.send({status: "ok", data:data});
        });
    }catch(error){
        res.json({status: error});
    }
})

//------------------------------------------------

//patient, call Register model

require("./Model/PatientModel");

const Patient = mongoose.model("PatientRegister");


app.post("/patientregister", async (req, res) => {
  const { name, gmail, password, age, address, contact } = req.body;

  try {
    const newPatient = await Patient.create({
      name,
      gmail,
      password,
      age,
      address,
      contact,
    });

    res.send({ status: "ok", data: newPatient }); // ✅ send back patient data
  } catch (err) {
    console.error("Error during registration:", err);
    res.send({ status: "err" });
  }
});


//patient login--------------

app.post("/log", async (req, res) => {
  const { gmail, password } = req.body;

  try {
    const patient = await Patient.findOne({ gmail });

    if (!patient) {
      return res.json({ err: "client Not found" });
    }

    if (patient.password === password) {
      return res.json({ err: "ok", data: patient }); // ✅ include patient
    } else {
      return res.json({ err: "incorrect Password" });
    }
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ err: "server Err" });
  }
});


//get patient registers
app.get("/getPatients", async (req, res) => {
  try {
    const patients = await Patient.find({});
    res.json({ status: "ok", data: patients });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

// Update patient by ID
// Get one patient by ID
app.get("/getPatient/:id", async (req, res) => {
  try {
    const patientId = req.params.id;
    const patient = await Patient.findById(patientId);

    if (!patient) {
      return res.status(404).json({ status: "error", message: "Patient not found" });
    }

    res.json({ status: "ok", data: patient });
  } catch (err) {
    console.error("Error getting patient:", err);
    res.status(500).json({ status: "error", message: err.message });
  }
});

// Update patient
app.put("/updatePatient/:id", async (req, res) => {
  const patientId = req.params.id;
  const updatedData = req.body;

  if (!mongoose.Types.ObjectId.isValid(patientId)) {
    return res.status(400).json({ status: "error", message: "Invalid patient ID" });
  }

  try {
    const updatedPatient = await Patient.findByIdAndUpdate(
      patientId,
      updatedData,
      { new: true, runValidators: true }
    );

    if (!updatedPatient) {
      return res.status(404).json({ status: "error", message: "Patient not found" });
    }

    res.json({ status: "ok", data: updatedPatient });
  } catch (err) {
    console.error("Error updating patient:", err);
    res.status(500).json({ status: "error", message: err.message });
  }
});

//delete patient
// Delete user by ID
app.delete('/deletePatient/:id', async (req, res) => {
  try {
    const patientId = req.params.id;
    await Patient.findByIdAndDelete(patientId);
    res.json({ status: "ok", message: "patient deleted" });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

//---------------------------------------------------------------------
require("./Model/AppointmentModel");
const Appointment = mongoose.model("Appointment");

// POST: Book Appointment
app.post("/appointment", async (req, res) => {
  const { doctorId, doctorName, specialization, patientName, date, time, reason } = req.body;
  try {
    const newAppointment = await Appointment.create({
      doctorId,
      doctorName,
      specialization,
      patientName,
      date,
      time,
      reason,
    });
    res.send({ status: "ok", data: newAppointment });
  } catch (err) {
    console.error("Error booking appointment:", err);
    res.send({ status: "error", message: err.message });
  }
});



// GET: Get all appointments
app.get("/appointments", async (req, res) => {
  try {
    const appointments = await Appointment.find().populate("doctorId", "name");
    res.json({ status: "ok", data: appointments });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});


app.get("/getAppointment/:id", async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({ status: "error", message: "appointment not found" });
    }

    res.json({ status: "ok", data: appointment });
  } catch (err) {
    console.error("Error getting patient:", err);
    res.status(500).json({ status: "error", message: err.message });
  }
});



// Update appointment
app.put("/updateAppointment/:id", async (req, res) => {
  const appointmentId = req.params.id;
  const updatedData = req.body;

  if (!mongoose.Types.ObjectId.isValid(appointmentId)) {
    return res.status(400).json({ status: "error", message: "Invalid appointment ID" });
  }

  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      updatedData,
      { new: true, runValidators: true }
    );

    if (!updatedAppointment) {
      return res.status(404).json({ status: "error", message: "appointment not found" });
    }

    res.json({ status: "ok", data: updatedAppointment });
  } catch (err) {
    console.error("Error updating appointment:", err);
    res.status(500).json({ status: "error", message: err.message });
  }
});

//delete appointment
// Delete appointment by ID
app.delete('/deleteAppointment/:id', async (req, res) => {
  try {
    const appointmentId = req.params.id;
    await Appointment.findByIdAndDelete(appointmentId);
    res.json({ status: "ok", message: "appointment deleted" });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

