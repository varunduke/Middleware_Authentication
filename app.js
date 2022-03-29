//https://www.geeksforgeeks.org/node-js-authentication-using-passportjs-and-passport-local-mongoose/
const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;

//new code for Authentications. We need these three packages
//Install the following packages and the code in this order. Otherwise it is not going to work. 
//Node pipe line has to be in this order
const passport = require('passport');
const session = require('express-session');
const User = require('./src/models/user');

const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({ extended: true }));
  
app.use(passport.initialize());
app.use(session({secret:'ift458'}));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(User.authenticate()));

//ADD insert Views
const path = require('path');
app.use(express.static(path.join(__dirname, '/public/')));
//**Add middleware to parse the body
app.use(express.json());
app.use(express.urlencoded({extended:false}));// boiler plate code

// import router from custom routers
const userRouter = require('./src/routers/userRouter');
app.use('/user', userRouter);
// add admin router
const authRouter = require('./src/routers/authRouter');
app.use('/auth', authRouter);

const courseRouter = require('./src/routers/courseRouter');
app.use('/course', courseRouter);

const customerRouter = require('./src/routers/customerRouter');
app.use('/customer', customerRouter);

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index', { title: 'IFT 458/598 Lab 2', date: new Date()});
});

//Create a MongoDB Connection String
const uri = 'mongodb+srv://varun:Varun.1998@cluster0.piiqp.mongodb.net/IFT258LAB2?retryWrites=true&w=majority';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.on('Error', ()=>{
  console.log("MongoDB database connection was not successfully");
});
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

const nodeSeverPort = `listening on port ${chalk.green(PORT)}`;

app.listen(PORT, () => {
  debug(nodeSeverPort);
  console.log(nodeSeverPort);
});
