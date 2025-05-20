const jwt = require('jsonwebtoken');  // its use for authenticatin and authoarization 
const createError = require('../utils/createError');


const verifyToken = (req, res, next) => {    // its use to verify the signature that alot on authentication
    const token = req.cookies.accessToken;
    if (!token) return next(createError(401,"You are not authenticated!"))
  
  
    jwt.verify(token,  process.env.JWT_KEY, async (err, payload) => {   // it verify the role of user and allow to access on the  bases of role 
      if (err) return next(createError(403,"Token is not valid!"))
      req.userId = payload.id;
      req.isSeller = payload.isSeller;
      next()
    });
  };

  module.exports = verifyToken;