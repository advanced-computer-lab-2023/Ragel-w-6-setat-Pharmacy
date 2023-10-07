// import modules
const express = require("express");
const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
//const {createUser,getUsers, updateUser, deleteUser} = require("./Routes/userController");
const MongoURI = process.env.MONGO_URI ;

// app
const app = express();
//const user = require('./Models/User');

 // db
 mongoose.connect(MongoURI).then(()=>
   console.log("MongoDB is now connected!")).catch(err => console.log("DB CONNECTION ERROR",err));

 // middleware
app.use(morgan("dev"));
app.use(cors({origin: true, credentials: true}));

//routes
const testRoutes = require("./routes/test");
app.use("/",testRoutes);


//port
const port = process.env.PORT || "8000";

//listeners
const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

