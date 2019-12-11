const express = require("express");
const userRoute = express.Router();

const {  deleteUser,
    updateUser,
    getUser,
    getallUser,
    createOne} = require('../controller/userController');

const {
    login,
    signUp,
    forgetPassword,
    resetPassword,
    logout
}   = require('../controller/authController');


userRoute
.post('/login',login)
.get('/logout',logout)
.post('/signUp',signUp)
.post('/forget',forgetPassword)
.patch('/reset/:token',resetPassword);


userRoute
.get('/',getallUser)
.post('/delete',deleteUser)
.post('/update',updateUser)
.post('/',createOne);

module.exports = userRoute;






















// basic CRUD functions
// deleteUser,
// updateUser,
// getUser,
// getallUser,
// createOne