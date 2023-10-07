const express = require("express");
const router = express.Router();

//import controllers
/*const {getTest} = require("../controllers/test"); */


//import middlewares

//api routes
router.get("/test",getTest);
/* router.get('/', () => {
    
}) */

module.exports = router;