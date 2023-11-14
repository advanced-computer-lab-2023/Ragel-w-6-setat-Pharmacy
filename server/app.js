// import modules
const express = require("express");
const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
const morgan = require("morgan");
const cors = require("cors");
const multer = require('multer');
const User = require('./models/User');
const cookieParser = require('cookie-parser');
const {requireAuth}= require('./middlewares/AuthMiddleware');

require("dotenv").config();
// const {createUser,getUsers, updateUser, deleteUser} = require("./Routes/userController");
const MongoURI = process.env.MONGO_URI;

// app
const app = express();
// const user = require('./Models/User');
console.log("test")

//Multer config
//FIXME check shahed shit to update this 
const storage = multer.diskStorage({ 
  destination: (req, file, cb) => { 
      cb(null, './uploads')  //save the file uploads to the server
  }, 
  filename: (req, file, cb) => {  //TODO add username's name
    const fileName=`${Date.now()}_${file.originalname.toLowerCase().split(' ').join('-')}`;
    cb(null, fileName) ;
  } ,

});
const upload = multer({ storage}).single('pdf')  ;



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
app.use(cookieParser());

// JWT authentication middleware
const authenticateJWT = (req, res, next) => {
/*   const token = req.header('x-auth-token');
 */
const authHeader = req.headers['authorization'];
const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
      const decoded = jwt.verify(token, jwtSecret, (err,user) => {
        if (err) {
          return res.status(403).json({ message: 'we know you have token but that token in no longer valid babe' });
        }
        req.user = user;
        next();
      });
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Uploads folder
app.use(express.static('uploads'));





// routes
const patientRoutes = require('./routes/Patient')
const pharmacistRoutes = require('./routes/Pharmacist')
const adminRoutes = require('./routes/Admin')
const userRoutes = require('./routes/User')


//FIXME add authenticareJWT to patient
// Use the routes
app.use('/api/patient', authenticateJWT,patientRoutes)
app.use('/api/pharmacist', authenticateJWT,pharmacistRoutes)
app.use('/api/admin', authenticateJWT,adminRoutes)
app.use('/api/user', userRoutes);





// port
const port = process.env.PORT || "8000";

// listeners



