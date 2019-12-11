const express = require('express');
const viewRouter = express.Router();
const plans = require('../data/plan.json');
const {isLoggedIn } = require('../controller/authController');



viewRouter
.use(isLoggedIn);

viewRouter
.get('/',(req,res)=>{
    res.render('home.pug',{
        plans: plans.slice(0,3),
        user: req.user
    });
})
.get('/plans',(req,res)=>{
    res.render('plans.pug',{
        plans:plans,
        user:req.user
    })
})
.get('/login',(req,res)=>{
    res.render('login.pug',{
        user: req.user
    });
})
.get('/profile',(req,res)=>{
    res.render('profile.pug',{
        user:req.user
    })
});

module.exports = viewRouter