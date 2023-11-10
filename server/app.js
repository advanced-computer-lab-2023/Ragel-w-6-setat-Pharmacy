// import modules
const express = require("express");
const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
const morgan = require("morgan");
const cors = require("cors");
const multer = require('multer');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('./models/User');
const LocalStrategy = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const session = require('express-session');

require("dotenv").config();
// const {createUser,getUsers, updateUser, deleteUser} = require("./Routes/userController");
const MongoURI = process.env.MONGO_URI;

// app
const app = express();
// const user = require('./Models/User');
console.log("test")

//Multer config
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

//FIXME ??
// Configure JWT secret key (replace 'your-secret-key' with your secret)
const jwtSecret = process.env.ACCESS_TOKEN_SECRET;

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.ACCESS_TOKEN_SECRET,
    },
    (jwtPayload, done) => {
      // Verify the token and retrieve user data
      User.findById(jwtPayload.userId, (err, user) => {
        if (err) return done(err, false);
        if (user) return done(null, user);
        return done(null, false);
      });
    }
  )
);

// middleware
app.use(morgan("dev"));
app.use(cors({ origin: true, credentials: true }));
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next();
});
app.use(express.json()); // to allow us to access the body
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

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
// Import the registration and login routes
const registerRoute = require('./routes/Register');
const loginRoute = require('./routes/Login');
const protectedRoutes = require('./routes/ProtectedRoutes')


// Use the routes
app.use('/api/patient',authenticateJWT, patientRoutes)
app.use('/api/pharmacist', authenticateJWT,pharmacistRoutes)
app.use('/api/admin', authenticateJWT,adminRoutes)
app.use('/api/register', registerRoute);
app.use('/api/login', loginRoute);




// port
const port = process.env.PORT || "8000";

// listeners



