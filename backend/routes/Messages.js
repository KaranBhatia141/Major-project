const express = require('express');
const router = express.Router();
const Messages = require('../models/Messages');

router.get('/' , async(req , res )=>{   // to get all messages 
    const messages = await Messages.find();
    res.json(messages);
    
});

router.post('/' , async(req,res)=>{  // to post all messages 
    const {text} = req.body;
    const newMessages = new Messages({text});
     await newMessages.save();
     res.status(201).json(newMessages); 
});

module.exports = router;