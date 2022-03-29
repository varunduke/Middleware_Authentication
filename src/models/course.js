
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const Schema = mongoose.Schema;

const courseSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    email : {type: String, required:true, unique: true},
    password:{type: String, required: true, unique: true},
}, {
    timestamps: true,
});

courseSchema.plugin(passportLocalMongoose);
const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
// const userSchema = new Schema({
//     username:{
//         type: String,
//         required: true,
//         unique: true,
//         trim: true,
//         minlength: 3
//     },
//     email : {type: String, required:false, unique: false},
//     password:{type: String, required: false, unique: false},
// }, {
//     timestamps: true,
// });

// userSchema.plugin(passportLocalMongoose);
// const User = mongoose.model('User', userSchema);

// module.exports = User;