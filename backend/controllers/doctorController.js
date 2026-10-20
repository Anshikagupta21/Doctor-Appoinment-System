// const DoctorModel = require("../models/doctorModel");



// const doctorSave=async(req, res)=>{
//  try {
//      const   {name, speciality, city, address, contact, email, password}= req.body;
    
//      const Doctor = await DoctorModel.create({
//          doctorname: name,
//         speciality: speciality,
//          city: city,
//          address: address,
//         image: req.file ? req.file.path : null,


//          contact:contact,
//          email: email,
//          password: password
//      })    


//  res.json({
//  success: true,
//  fileUrl: req.file.path, // Cloudinary file URL
//  });
//  } catch (err) {
//  res.status(500).json({ success: false, message: err.message });
//  }
// }




// const doctorLogin=async(req, res)=>{
//     const { email, password} = req.body;
      
//     try {
//           const Doctor = await DoctorModel.findOne({email:email});
//           console.log(Doctor);
//           if (!Doctor)
//           {
//             res.status(401).send({msg:"Email not found!"});
//           }

//           if (Doctor.password!=password)
//           {
//             res.status(401).send({msg:"Password does not match!"});
//           }

//           res.status(200).send(Doctor);

//     } catch (error) {
//          console.log(error);
//     }
// }

// const doctorInfo=async(req, res)=>{
    
//   try {
//           const Doctor = await DoctorModel.find();
//           res.status(200).send(Doctor);
//      } catch (error) {
//         console.log(error);
//      }
       
// }

// const doctorSearchByName=async(req, res)=>{
//   const {name} = req.body;
//   const Doctor = await DoctorModel.find({doctorname:name});
//   res.status(200).send(Doctor);
// }

// const doctorSearchByCity=async(req, res)=>{
//     const {city} = req.body;
//   const Doctor = await DoctorModel.find({city:city});
//   res.status(200).send(Doctor);
// }

// const doctorSearchBySpeciality=async(req, res)=>{
//   const { speciality } = req.body ;
//   const Doctor = await DoctorModel.find({speciality:speciality});
//   res.status(200).send(Doctor);
// }

// const getdoctorInfo=async(req, res)=>{
//   const {id} = req.query;
//   const Doctor = await DoctorModel.findById(id);
//   res.send(Doctor);
// }


// const patientSave=async(req, res)=>{
//   const {id, patientname, deseases, address, contact, email } = req.body;
//     const Pateint = await PatientModel.create({
//           patientname: patientname, 
//         deseases: deseases,
//          contactno:contact,
//          address: address,
//          email: email,
//          docid: id
//     })

// res.status(201).send("Patient Detail Save!!");
// }

// const getPateintDetail=async(req, res)=>{
//       const {id} = req.query;
//       const patient = await PatientModel.find({docid:id})
//       res.send(patient);

// }

// module.exports={
//     doctorSave,
//     doctorLogin,
//     doctorInfo,
//     doctorSearchByName,
//     doctorSearchByCity,
//     doctorSearchBySpeciality,
//     getdoctorInfo,
//     patientSave,
//     getPateintDetail
// }

const DoctorModel = require("../models/doctorModel");
const PatientModel = require("../models/patientModel");
// Controller function
const doctorSave = async (req, res) => {
  try {
    console.log("Body:", req.body);
    console.log("File:", req.file);

    const { name, speciality, city, address, contact, email, password } = req.body;

    if (!req.file) {
      return res.status(400).json({ success: false, message: "Image file is required" });
    }

    const imagePath = req.file.path;

    const Doctor = await DoctorModel.create({
      doctorname: name,
      speciality,
      city,
      address,
      image: imagePath,
      contact,
      email,
      password,
    });

    res.status(201).json({
      success: true,
      message: "Doctor saved successfully",
      fileUrl: imagePath,
      doctor: Doctor,
    });
  } catch (err) {
    console.error("Error in doctorSave:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};



// ✅ Doctor Login
const doctorLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const Doctor = await DoctorModel.findOne({ email: email });
    if (!Doctor) {
      return res.status(401).json({ msg: "Email not found!" });
    }

    if (Doctor.password !== password) {
      return res.status(401).json({ msg: "Password does not match!" });
    }

    res.status(200).json(Doctor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error.message });
  }
};

// ✅ Get All Doctors
const doctorInfo = async (req, res) => {
  try {
    const Doctor = await DoctorModel.find();
    res.status(200).json(Doctor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error.message });
  }
};

// ✅ Search Doctors
const doctorSearchByName = async (req, res) => {
  const { name } = req.body;
  const Doctor = await DoctorModel.find({ doctorname: name });
  res.status(200).json(Doctor);
};

const doctorSearchByCity = async (req, res) => {
  const { city } = req.body;
  const Doctor = await DoctorModel.find({ city: city });
  res.status(200).json(Doctor);
};

const doctorSearchBySpeciality = async (req, res) => {
  const { speciality } = req.body;
  const Doctor = await DoctorModel.find({ speciality: speciality });
  res.status(200).json(Doctor);
};

// ✅ Get doctor by ID
const getdoctorInfo = async (req, res) => {
  const { id } = req.query;
  const Doctor = await DoctorModel.findById(id);
  res.status(200).json(Doctor);
};

// ✅ Save Patient
const patientSave = async (req, res) => {
  try {
    const { id, patientname, deseases, address, contact, email } = req.body;

    const Patient = await PatientModel.create({
      patientname: patientname,
      deseases: deseases,
      contactno: contact,
      address: address,
      email: email,
      docid: id
    });

    res.status(201).send("Patient Detail Saved!!");
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error.message });
  }
};
0
// ✅ Get Patients by Doctor ID
const getPateintDetail = async (req, res) => {
  const { id } = req.query;
  const patient = await PatientModel.find({ docid: id });
  res.status(200).json(patient);
};









const displayAppointment = async (req, res) => {
  try {
    const data = await PatientModel.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  doctorSave,
  doctorLogin,
  doctorInfo,
  doctorSearchByName,
  doctorSearchByCity,
  doctorSearchBySpeciality,
  getdoctorInfo,
  patientSave,
  getPateintDetail,
  displayAppointment
};
