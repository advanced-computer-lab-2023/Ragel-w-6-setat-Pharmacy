// import modules
const http= require('http');
const path = require('path');
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

const httpServer = http.createServer(app);  
const {Server} = require('socket.io');
const io = new Server(httpServer);


io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Handle chat messages
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg); // Broadcast the message to all connected clients
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

httpServer.listen(8080, () => {

  console.log('listening on *:8080');
});

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
const userRoutes = require('./routes/User');
const conversationRoutes = require('./routes/Conversation');
const messageRoutes = require('./routes/Message');
const { fileURLToPath } = require('url');


app.use('/api/patient', patientRoutes)
app.use('/api/pharmacist', pharmacistRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/user', userRoutes)
app.use('/api/conversation',conversationRoutes)
app.use('/api/message',messageRoutes)



// port
const port = process.env.PORT || "8000";

// listeners  tyetstst

//const __dirname = path.dirname(_filename);
const _filename= fileURLToPath;
app.get("/chatWithPharmacist", (req, res) => {
  res.sendFile(__dirname + '/index.html');
})