const mongoose = require('mongoose');

const messagesSchema = new mongoose.Schema({
    text :{
        type:String,
        requeired:true
    },
    CreatedAt :{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('Message' , messagesSchema);