const User = require('../models/User');   // user schema
const bcrypt = require('bcrypt');              //   its library file help to use hash passwords 
                                               // controller work as bridge between routes and servies models and handle request response to the clint 
const jwt = require('jsonwebtoken');  //  we use this to securely transmit information between parties for authenticatio n and authorisation in web application
const createError = require('../utils/createError');  // error file to display a message and status

const register = async (req, res, next) => {           //  user register controller 
    try {
      const hash = bcrypt.hashSync(req.body.password, 5);  
      const newUser = new User({    // create a new user in bd 
        ...req.body,
        password: hash,
      });
  
      await newUser.save();      // new user are save 
      res.status(201).send("User has been created.");  // display message if user is created success fully
    } catch (err) {  // catch block to an error 
      next(err);
    }
  };
   const login = async (req, res, next) => {             //  user login controller
    try {
      const user = await User.findOne({ username: req.body.username });   // function or promise that send res to clinet side from db
  
      if (!user) return next(createError(404, "User not found!"));
  
      const isCorrect = bcrypt.compareSync(req.body.password, user.password);  // method that compare the the password 
      if (!isCorrect)
        return next(createError(400, "Wrong password or username!"));
  
      const token = jwt.sign(        // in this token a set of key  containing the public keys used to verify any JWT issued by the authorization server and signed using roles
        {
          id: user._id,
          isSeller: user.isSeller,
        },
        process.env.JWT_KEY       // it is an enviorment variable that holds the jwt secret key
      );
  
      const { password, ...info } = user._doc;
      res
        .cookie("accessToken", token, {                // cookies are key-value pairs sent by the server to the client via HTTP headers. 
        
          httpOnly: true,
        })
        .status(200)
        .send(info);
    } catch (err) {
      next(err);
    }
  };
  
   const logout = async (req, res) => {                        //  user logout controller
    res
      .clearCookie("accessToken", {  // after logout user acess token is clear from browers 
        sameSite: "none",
        secure: true,
      })
      .status(200)
      .send("User has been logged out.");
  }

  module.exports = {register , logout , login} 