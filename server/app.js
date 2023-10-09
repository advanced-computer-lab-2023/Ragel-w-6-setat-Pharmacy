// import modules
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
// const user = require('./Models/User');

// db
mongoose.connect(MongoURI).then(() =>
  console.log("MongoDB is now connected!")).catch(err => console.log("DB CONNECTION ERROR", err));

// middleware
app.use(morgan("dev"));
app.use(cors({ origin: true, credentials: true }));
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next();
});
app.use(express.json()); // to allow us to access the body
app.use(bodyParser.json());

// routes
const patientRoutes = require('./routes/Patient')
const pharmacistRoutes = require('./routes/Pharmacist')
const adminRoutes = require('./routes/Admin')

app.use('/api/patient', patientRoutes)
app.use('/api/pharmacist', pharmacistRoutes)
app.use('/api/admin', adminRoutes)

// port
const port = process.env.PORT || "8000";

// listeners
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})