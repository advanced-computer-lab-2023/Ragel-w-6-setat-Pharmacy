const express = require('express')

const router = express.Router();
const multer = require('multer');

const {
    registerPatient,registerPharmacist, logout, login, getUsers
} = require('../controllers/UserController')

//Multer config

//FIXME change all lower case?
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


// Register as Patient
router.post("/registerPatient", registerPatient)

/* //Create a Pharmacist 
router.post("/", createPharmacist) */



// View a list of all medicines
router.post("/registerPharmacist", registerPharmacist)

// View the available quantity and sales of each medicine
router.post("/login", login)

// Search for medicine based on name
router.get("/logout", logout)

router.get("/getUsers", getUsers)


/* //Upload documents: national ID, pharmacy degree and working license
router.post('/uploadDocuments',upload, (req,res) => {
    const {file } = req;
    res.send({

            file: file.originalname,
            path: file.path,
        });
    }); */


module.exports = router