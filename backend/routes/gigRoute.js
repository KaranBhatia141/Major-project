const express = require('express'); //Express is a framework built on top of Node.js, offering a streamlined way to handle HTTP requests and responses, manage routes, and use middleware
const {createGig,deleteGig,getGig,getGigs} = require('../controller/gig.controller');
const verifyToken  = require("../middleware/jwt");


const router = express.Router();

router.post("/", verifyToken, createGig);             //verifyToken,to jwt for check user
router.delete("/:id",verifyToken, deleteGig);                 //verifyToken,to jwt  for check user 
router.get("/single/:id", getGig);
router.get("/", getGigs);

module.exports = router;