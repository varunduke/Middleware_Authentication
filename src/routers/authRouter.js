const authRouter = require('express').Router();
const debug = require('debug')('app:authRouter');

const User = require('../models/user');

authRouter.route('/signUp').post((req, res) => {
    let Users = new User(
        {
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        });
        User.register(Users, req.body.password, function(err, user){
            if(err)
            {
                res.json({success:false, message:'Your account could not be saved. Error: ', err});
            }
            else
            {
                res.json({success:true, message: 'Your account has been saved'});
            }
        });
});

authRouter.route('/login').post((req, res) => {
    let Users = new User({email: req.body.email, username: req.body.username});
        User.register(Users, req.body.password, function(err, user){
            if(err)
            {
                res.json({success:false, message:'Your account could not be saved. Error: ', err});
            }
            else
            {
                res.json({success:true, message: 'Your account has been saved'});
            }
        });
});

module.exports = authRouter;