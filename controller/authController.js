const userModel = require('../model/userModel');
const bcrypt = require('bcrypt');
const secret = "nitin_is_cool";
const jwt = require('jsonwebtoken');
const crypto = require('crypto');



async function login(req,res){
    try{
        const {email,password} = req.body;
        let user = await userModel.findOne({email});
         if(!user)
             return res.send({
                 status:"user not found",
                 statusCode: "404"
             });
     
         const realpassword = user.password;
        
         // compare the input password with the real password
         let result =  bcrypt.compareSync(password,realpassword);

         if(!result)
             return res.send({status:"wrong password",
             statusCode:"401"
                });

        let token = jwt.sign({email:user.email},secret,{
            expiresIn:'3d'
        });

        res.cookie('jwt',token,{httpOnly:true});
        res.status(200).json({
            status:"user login sucessfully",
            statusCode:"200"
        });
    }catch(er)
    {
        res.status(400).json({
            status:"something went wrong"
        })
    }   
};

async function signUp(req,res){
    try{
        console.log(req.body);
        let alreadyExist = await userModel.findOne({email:req.body.email});
        console.log(alreadyExist);
        if(!alreadyExist)
        {   
            console.log(req.body); 
            let user = await userModel.create(req.body);     
            let token = jwt.sign({email:user.email},secret,{
                expiresIn:'3d'
            });
            res.cookie('jwt',token,{httpOnly:true});
            res.send({
                status:"user signUp sucessfully",
                statusCode:"200"
            });

        }
        else{
            console.log("fuck ho gaya");
            res.send({
                status:"user already exists",
                statusCode:"400"
            })
        }
    }catch(er)
    {
        res.status(400).json({
            status:"something went wrong"
        })
    }   
};

async function forgetPassword(req,res){
    const email = req.body.email;

    const user = await userModel.findOne({email});
    if(!user)
    {
        return res.status(404).json({
            status:"user not found"
        })
    }
    let token  = user.createResetPassword();
  

    await user.save({ validateBeforeSave: false });
    // send the mail to the user

    res.status(200).end(token);
    
};

async function resetPassword(req,res){
    try{
        const token = ""+req.params['token'];
        const cryptoToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");
        const user = await userModel.findOne({resetToken:cryptoToken});
        console.log(user);
        if(!user)
        {
            return res.status(404).json({
                status:"user not found"
            })
        }
        user.password=req.body.password;
        user.confirmPassword = req.body.confirmPassword;
        user.resetToken=undefined;
        user.expiresIn=undefined;
        user.lastName="habhai";
        user.save();
        res.status(200).json({
            status:"password reset successfully :)"
        });
    }catch(err)
    {
        console.log(err);
        res.status(400).json({
            status:"something went wrong"
        })
    }
};


async function isLoggedIn(req, res, next) {
    console.log("yooooo");
    console.log(req.cookie);
    const token = req.cookies
      ? req.cookies.jwt
      : null || req.headers.authorization
      ? req.headers.authorization.split(" ")[1]
      : null;
      console.log(token);
    try {
      if (token) {
        const ans = await jwt.verify(`${token}`, secret);
        if (ans) {
          const user = await userModel.findOne({ email: ans.email });
          req.role = user.role;
          req.user = user;
          next();
        } else {
          next();
        }
      } else {
        next();
      }
    } catch (err) {
      console.log(err);
      res.json({
        data: err
      });
    }
};

async function logout(req,res)
{
    // as we cannot delete cookies , so just update it's expiring date to now
    res.clearCookie('jwt');
    res.redirect('/');
}

module.exports ={
    login,
    signUp,
    forgetPassword,
    resetPassword,
    isLoggedIn,
    logout
}