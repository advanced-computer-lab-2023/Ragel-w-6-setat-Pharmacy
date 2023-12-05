// import modules
const multer = require('multer');
const express = require("express");
const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();


// const {createUser,getUsers, updateUser, deleteUser} = require("./Routes/userController");
const MongoURI = process.env.MONGO_URI;

// app
const app = express();


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "/uploads");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    ); //Appending extension
  },
});

const upload = multer({ storage: storage });
// const user = require('./Models/User');
// db
mongoose.connect(MongoURI)
  .then(() =>
    console.log("MongoDB is now connected!")).
  then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`)
    })
  }).
  catch(err => console.log("DB CONNECTION ERROR", err));

// middleware
app.use(morgan("dev"));
app.use(cors({ origin: true, credentials: true }));
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next();
});
app.use(express.json()); // to allow us to access the body
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: false }));


// routes
const patientRoutes = require('./routes/Patient')
const pharmacistRoutes = require('./routes/Pharmacist')
const adminRoutes = require('./routes/Admin')
const userRoutes = require('./routes/User')


app.use('/api/patient', patientRoutes)
app.use('/api/pharmacist', pharmacistRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/user', userRoutes)

// port
const port = process.env.PORT || "8000";

// listeners  tyetstst