const Gig = require("../models/Gig.js");   //importing gig models 
const createError = require("../utils/createError.js");
const mongoose = require('mongoose');

 const createGig = async (req, res, next) => {    // create a gig api  in db
  if (!req.isSeller) // condition check only  seller can access the prop use 
    return next(createError(403, "Only sellers can create a gig!"));

  const newGig = new Gig({           // creating new gig in db     
    userId: req.userId,    // check the useer id 
    ...req.body,
  });

  try {      // check error condition 
    const savedGig = await newGig.save();
    res.status(201).json(savedGig);
  } 
  catch (err) {   //  throw error 
    next(err);
  }
};
 const deleteGig = async (req, res, next) => {            // delete gig api from db
  try {
    const gig = await Gig.findById(req.params.id);
    if (gig.userId !== req.userId)    // check user req to user id that user are same or not 
      return next(createError(403, "You can delete only your gig!"));

    await Gig.findByIdAndDelete(req.params.id);     // find the desired gig in db 
    res.status(200).send("Gig has been deleted!");
  } catch (err) {
    next(err);
  }
};
 const getGig = async (req, res, next) => {   // find specific gig in db
  try {
    const gig = await Gig.findById(req.params.id);
    
    if (!gig) next(createError(404, "Gig not found!"));
    res.status(200).send(gig);
  } catch (err) {
    next(err);
  }
};
 const getGigs = async (req, res, next) => {   // for specific gig of system
  const q = req.query;
  console.log("Query received:" , req.query);
  const objectid = new mongoose.Types.ObjectId(q.userId);
  console.log(objectid);
  const gigs = await Gig.find({userId:objectid});
  console.log(gigs);
  
  
  const filters = {
    ...(q.userId && { userId: q.userId }),
    ...(q.cat && { cat: q.cat }),
    ...((q.min || q.max) && {
      price: {
        ...(q.min && { $gt: q.min }),
        ...(q.max && { $lt: q.max }),
      },
    }),
    ...(q.search && { title: { $regex: q.search, $options: "i" } }),
  };
  
  try {
    const gigs = await Gig.find(filters).sort({ [q.sort]: -1 });
    res.status(200).send(gigs);
  } catch (err) {
    next(err);
  }
}

module.exports = {createGig , deleteGig, getGig, getGigs};