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
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next();
});
app.use(express.json()); //to allow us to access the body


//routes
const testRoutes = require("./routes/test");
app.use("/",testRoutes);

app.get('/', (req, res) => {    //test test
  res.json({mssg:'Welcome to the app'})
})


//port
const port = process.env.PORT || "8000";

//listeners
 app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

