const CustomerRouter = require('express').Router();
//let User = require('../models/user');
let Customer = require('../models/customer');

CustomerRouter.use((req, res, next) => {
    if(req.user)
    {
        next();
    }
    else{
        res.redirect('/');
    }
});

CustomerRouter.use((req, res, next) => {
    if(req.user)
    {
        next();
    }
    else{
        res.redirect('/auth/signIn');
    }
});

CustomerRouter.use((req, res, next) => {
    if(req.user.cc)
    {
        next();
    }
    else{
        res.redirect('/auth/creditCard');
    }
});

CustomerRouter.route('/').get((req, res) =>{
    Customer.find().then(users => res.json(users)).catch(err => res.status(400).json('Error: ' + err));
});

CustomerRouter.route('/add').post((req, res) =>{
    const customer = req.body.customer;
    const newUser = new Customer(customer);

    newUser.save().then(() => res.json('Customer Added!')).catch(err => res.status(400).json('Error: ' + err));
    //newUser.save().then(() => res.json('User Added!')).catch(err => res.status(400).json('Error: ' + err));
});

CustomerRouter.route('/:id').get((req, res) => {
    Customer.findById(req.params.id).then(excercise => res.json(excercise)).catch(err => res.status(400).json('Error: ' + err));
});

CustomerRouter.route('/:id').delete((req, res) => {
    Customer.findByIdAndDelete(req.params.id).then(() => res.json('Customer Deleted.')).catch(err => res.status(400).json(
        'Error: ' + err));
});

CustomerRouter.route('/:id').put((req, res) => {
    Customer.findById(req.params.id).then(customer => {
        customer.customer = req.body.customer;

        customer.save().then(() => res.json('Customer updated!'))
    }).catch(err => res.status(400).json('Error ' + err));
});

module.exports = CustomerRouter;