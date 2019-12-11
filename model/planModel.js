const mongoose = require('mongoose');
const validator = require('validator');

const DB = "mongodb+srv://niti_n_n_itin:1234abcd@cluster0-2p8ap.mongodb.net/test?retryWrites=true&w=majority";


mongoose.connect(DB,{
    useNewUrlParser:true,
    useCreateIndex:true
});

const planSchema  = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        validate:validator.isAlpha
    },

});