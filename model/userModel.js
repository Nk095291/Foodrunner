const mongoose = require('mongoose');
const validator = require("validator");
const bcrypt = require("bcrypt");
const crypto = require('crypto');

const DB = "mongodb+srv://niti_n_n_itin:1234abcd@cluster0-2p8ap.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(DB,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("connected to user DB");
});

const userSchema  = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        validate:validator.isAlpha
    },
    lastName:{
        type:String,
        required:true,
        validate:validator.isAlpha
    },
    email:{
        type:String,
        required:true,
        validate:validator.isEmail
    },
    password:{
        type:String,
        required:true,
        min:8
    },
    confirmPassword:{
        type:String,
        required:true,
        min:8,
        validate:function(){
            return this.password==this.confirmPassword;
        }
    },
    role:{
        type:String,
        default:"user"
    },
    resetToken: String,
    expiresIn: Date
});
userSchema.pre("save",async function(){
    this.password = await bcrypt.hash(this.password,6);
    this.confirmPassword=null;
});
userSchema.methods.createResetPassword = function(){
    const cryptoToken = crypto.randomBytes(32).toString("hex");
    this.resetToken = crypto
    .createHash("sha256")
    .update(cryptoToken)
    .digest("hex");
    this.expiresIn=Date.now()+1000*60*60 ; 
    return cryptoToken;
}

const userModel = new mongoose.model('users',userSchema);

module.exports=userModel;