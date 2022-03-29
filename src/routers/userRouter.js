const router = require('express').Router();
let User = require('../models/user');

router.use((req, res, next) => {
    if(req.user)
    {
        next();
    }
    else{
        res.redirect('/');
    }
});

router.use((req, res, next) => {
    if(req.user)
    {
        next();
    }
    else{
        res.redirect('/auth/signIn');
    }
});

router.use((req, res, next) => {
    if(req.user.cc)
    {
        next();
    }
    else{
        res.redirect('/auth/creditCard');
    }
});


router.route('/').get((req, res) =>{
    User.find().then(users => res.json(users)).catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) =>{
    const username = req.body.username;
    const newUser = new User({username});

    newUser.save().then(() => res.json('User Added!')).catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    User.findById(req.params.id).then(excercise => res.json(excercise)).catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id).then(() => res.json('User Deleted.')).catch(err => res.status(400).json(
        'Error: ' + err));
});

router.route('/:id').put((req, res) => {
    User.findById(req.params.id).then(user => {
        user.username = req.body.username;

        user.save().then(() => res.json('User updated!'))
    }).catch(err => res.status(400).json('Error ' + err));
});

module.exports = router;