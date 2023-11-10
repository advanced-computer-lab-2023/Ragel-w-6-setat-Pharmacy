const express = require('express')

const router = express.Router();
const multer = require('multer');

const {
    createPharmacistRequest,
   // createPharmacist,
    getAllMedicines,
    getQuantityAndSalesOfMedicine,
    getMedicineByName,
    getMedicinesByMedicinalUse,
    addMedicine,
    editMedicine
} = require('../controllers/PharmacistController')

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


// Make a pharmacist Request 
router.post("/createPharmacistRequest", createPharmacistRequest)

/* //Create a Pharmacist 
router.post("/", createPharmacist) */



// View a list of all medicines
router.get("/getAllMedicines", getAllMedicines)

// View the available quantity and sales of each medicine
router.get("/getQuantityAndSalesOfMedicine", getQuantityAndSalesOfMedicine)

// Search for medicine based on name
router.get("/getMedicineByName", getMedicineByName)

// Filter medicines based on medicinal use
router.get("/getMedicinesByMedicinalUse", getMedicinesByMedicinalUse)

// Add a medicine 
router.post("/addMedicine", addMedicine)

// Edit medicine details and price 
router.patch("/editMedicine", editMedicine)

//Upload documents: national ID, pharmacy degree and working license
router.post('/uploadDocuments',upload, (req,res) => {
    const {file } = req;
    res.send({

            file: file.originalname,
            path: file.path,
        });
    });


module.exports = router