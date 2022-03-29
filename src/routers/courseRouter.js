const courseRouter = require('express').Router();
//let User = require('../models/user');
let Course = require('../models/user');

// courseRouter.use((req, res, next) => {
//     if(req.user)
//     {
//         next();
//     }
//     else{
//         res.redirect('/');
//     }
// });

// courseRouter.use((req, res, next) => {
//     if(req.user)
//     {
//         next();
//     }
//     else{
//         res.redirect('/auth/signIn');
//     }
// });

// courseRouter.use((req, res, next) => {
//     if(req.user.cc)
//     {
//         next();
//     }
//     else{
//         res.redirect('/auth/creditCard');
//     }
// });

courseRouter.route('/').get((req, res) =>{
    Course.find().then(users => res.json(users)).catch(err => res.status(400).json('Error: ' + err));
});

courseRouter.route('/add').post((req, res) =>{
    const username = req.body.username;
    const newUser = new Course({username});

    newUser.save().then(() => res.json('Course Added!')).catch(err => res.status(400).json('Error: ' + err));
    //newUser.save().then(() => res.json('User Added!')).catch(err => res.status(400).json('Error: ' + err));
});

courseRouter.route('/:id').get((req, res) => {
    Course.findById(req.params.id).then(excercise => res.json(excercise)).catch(err => res.status(400).json('Error: ' + err));
});

courseRouter.route('/:id').delete((req, res) => {
    Course.findByIdAndDelete(req.params.id).then(() => res.json('Course Deleted.')).catch(err => res.status(400).json(
        'Error: ' + err));
});

courseRouter.route('/:id').put((req, res) => {
    Course.findById(req.params.id).then(user => {
        user.username = req.body.username;

        user.save().then(() => res.json('Course updated!'))
    }).catch(err => res.status(400).json('Error ' + err));
});

module.exports = courseRouter;