const express = require('express');         // we use express framework in node to  build web application and mioble application  api
const mongoose = require('mongoose');      // mongoose use for ODM for mongo db simplify the data base intreaction by providing between data base 
const cors = require('cors');       // cros is express node js pacakage that provide a middle ware that use to connect frontend and backend     
const cookieParser = require('cookie-parser'); //  Cookie header from HTTP requests, making cookies accessible in the req.cookies object, and optionally supports signed cookies for enhanced security.
const dotenv = require ("dotenv");  // dotenv is a zero-dependency module that loads environment variables from a .env file
const authRoute= require('./routes/authRoute');
const gigRoute = require('./routes/gigRoute');
const userRoute = require('./routes/userRoute');
// const messageRoute = require('./routes/messageRoute');
const messages = require('./routes/Messages');
// const conversationRoute = require('./routes/conversationRoute');
// const orderRoute = require('./routes/orderRoute');
const payments = require('./controller/payment.controller')



const app = express();   // 
dotenv.config();  

mongoose.set("strictQuery", true);   //mongoose 

mongoose.connect('mongodb://127.0.0.1:27017/Freelance')       // connecting data base 
.then(()=>{
    console.log("DB connected successfully");
})
.catch((err)=>{
    console.log( err ,"DB error");
    
})

app.use(cors({ origin: "http://localhost:5173", credentials: true }));      // connecting frontend defining the origin to accept the request
app.use(express.json());               // its in build express middlewaree that pares the incoming req with json payload
app.use(cookieParser());

// path off api call
app.use("/auth", authRoute); 
app.use("/gigs", gigRoute);
app.use("/users", userRoute);
// app.use("/conversations", conversationRoute);
// app.use("/messages", messageRoute);
app.use("/messages", messages);
// app.use("/order", orderRoute);

app.use('/payments' , payments);

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
  
    return res.status(errorStatus).send(errorMessage);
  });



const PORT = 8080;         // assing the port wher server will run 
app.listen(PORT , ()=>{              // fun() that call  we can say the start the server 
    console.log(`Server is connected at http://localhost:${PORT}`);
    
})