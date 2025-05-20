const User = require ("../models/User.js");  //  import user schema from 
const createError = require ("../utils/createError.js");   // import error file 

 const deleteUser = async (req, res, next) => {    // delete user api 
  const user = await User.findById(req.params.id);

  if (req.userId !== user._id.toString()) {
    return next(createError(403, "You can delete only your account!"));
  }
  await User.findByIdAndDelete(req.params.id);    // for deleting user account in db 
  res.status(200).send("deleted.");
};
const getUser = async (req, res, next) => {       // get user api  
  const user = await User.findById(req.params.id);

  res.status(200).send(user);
};

module.exports = {deleteUser , getUser};