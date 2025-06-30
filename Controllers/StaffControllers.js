const Staff = require("../Model/StaffModel");


const loginStaff = async (req, res, next) => {
    const { gmail, password } = req.body;

    let existingStaff;

    try {
        existingStaff = await Staff.findOne({ gmail });
    } catch (err) {
        console.log("DB error", err);
        return res.status(500).json({ message: "Server error" });
    }

    if (!existingStaff) {
        return res.status(404).json({ message: "User not found" });
    }

    if (existingStaff.password !== password) {
        return res.status(400).json({ message: "Invalid credentials" });
    }

    return res.status(200).json({ message: "Login successful", err: "ok", staff: existingStaff });
};

exports.loginStaff = loginStaff;




//data display-----------
const getAllStaffs = async (req, res, next) => {

    let staffs;
    //get allusers

    try{
        staffs = await Staff.find();
    }catch (err){
        console.log(err);
    }

    //if not found users
    if(!staffs){
        return res.status(404).json({message:"User Not Found"});
    }

    //display all users
    return res.status(200).json({ staffs }); 
};

//data insert--------------
const addStaffs = async(req, res, next) => {
    const {name,gmail,password,stafftype,age,address} = req.body;

    let staffs;

    try{
        staffs = new Staff({name,gmail,password,stafftype,age,address});
        await staffs.save();
    }catch(err){
        console.log(err);
    }

    //if not data insert
    if(!staffs){
        return res.status(404).json({message:"unable to add users"});
    }
    return res.status(200).json({staffs});
};

//get by id------------------
const getById = async (req, res, next) => {

    const id = req.params.id;

    let staff;

    try{
        staff = await Staff.findById(id);
    }catch(err){
        console.log(err);
    }

     //not available user
    if(!staff){
        return res.status(404).json({message:"Not found user"});
    }
    return res.status(200).json({staff});

};

//update user details
const updateStaff = async (req, res, next) => {

    const id = req.params.id;
    const {name, gmail, password, stafftype, age, address} = req.body;

    let staffs;

    try{
        staffs = await Staff.findByIdAndUpdate(id,
            {name: name, gmail: gmail, password: password, stafftype: stafftype, age: age, address: address});
            staffs = await staffs.save();
    }catch(err){
        console.log(err);
    }

    //not available user
    if(!staffs){
        return res.status(404).json({message:"Unable to update user details"});
    }
    return res.status(200).json({staffs});

};

//Delete user
const deleteStaff = async (req, res, next) => {

    const id = req.params.id;

    let staff;

    try{
        staff = await Staff.findByIdAndDelete(id);
    }catch(err){
        console.log(err);
    }

    //not available user
    if(!staff){
        return res.status(404).json({message:"Unable to delete user details"});
    }
    return res.status(200).json({staff});
};



exports.getAllStaffs = getAllStaffs;
exports.addStaffs = addStaffs;
exports.getById = getById;
exports.updateStaff = updateStaff;
exports.deleteStaff = deleteStaff;

